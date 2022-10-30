const KEY = "NOVEL-AI-TAG";
import type { CatTags } from "./stores";
import localforage from "localforage";

async function importPreset(): Promise<CatTags> {
    const { default: data } = (await import("../assets/tags")) as any;
    return data;
}

export function saveTags(obj?: CatTags) {
    if (!obj) localforage.removeItem(KEY);
    return localforage.setItem(KEY, obj);
}

export async function loadTags(): Promise<CatTags> {
    const propmt = await localforage.getItem<CatTags>(KEY);

    if (!propmt || typeof propmt !== "object" || Object.keys(propmt).length === 0) {
        await saveTags(await importPreset());
        return await loadTags(); //! recursive
    }

    return propmt;
}

function mergeTags(dist: CatTags, source: CatTags, overwrite?: boolean, overwritePreset?: boolean): CatTags {
    for (const [catName, tagsObj] of Object.entries(source)) {
        if (typeof dist[catName] !== "object") dist[catName] = {};
        //! loop source
        for (const [tagName, tagInfo] of Object.entries(tagsObj)) {
            if (!overwrite && dist?.[catName]?.[tagName]) continue;
            if (!overwritePreset && !tagInfo.nonpreset) continue;
            dist[catName][tagName] = tagInfo;
        }
    }
    return dist;
}

interface ExportCatTags {
    [catName: string]: {
        [tagName: string]: string;
    };
}

export function exportData(catTags: CatTags, selectedCats?: Array<string>): ExportCatTags {
    const data: ExportCatTags = {};
    for (const [catName, tagsObj] of Object.entries(catTags)) {
        if (Array.isArray(selectedCats) && !selectedCats.includes(catName)) continue;
        data[catName] = {};
        for (const [tagName, tagInfo] of Object.entries(tagsObj)) {
            data[catName][tagName] = tagInfo.cn || tagName;
        }
    }
    return data;
}

export async function importData(newData: CatTags, overwrite?: boolean, overwritePreset?: boolean): Promise<CatTags> {
    for (const [catName, tagsObj] of Object.entries(newData)) {
        //! This MODIFY the data
        if (tagsObj && typeof tagsObj === "object")
            for (const [tagName, tagInfo] of Object.entries(tagsObj)) {
                if (typeof tagInfo === "string") newData[catName][tagName] = { cn: tagInfo, nonpreset: true };
                if (typeof tagInfo === "object") newData[catName][tagName] = { ...tagInfo, nonpreset: true };
            }
    }
    const oldData = await loadTags();
    const out = mergeTags(oldData, newData, overwrite, overwritePreset);
    await saveTags(out);
    return out;
}

/**
 * clean all PROMPT & NEGATIVE tags
 */
export async function clearAll() {
    await localforage.clear();
    await saveTags();
}
