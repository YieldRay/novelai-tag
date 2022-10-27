const KEY = "NOVEL-AI-TAG";

import type { CatTags, TagInfo, TagType } from "./stores";
import localforage from "localforage";
import useDeepMerge from "@fastify/deepmerge";
const deepMerge = useDeepMerge();

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
    if (!propmt) return await importPreset();
    return deepMerge(propmt, await importPreset());
}

function strengthenWord(str: string, count: number, l = "{", r = "}"): string {
    if (count <= 0) return "";
    if (count === 1) return str;
    return l.repeat(count - 1) + str + r.repeat(count - 1);
}

export interface TagDesc extends TagInfo {
    cat: string;
    tag: string;
}
export function tagsToTagsDesc(catTags: CatTags, isRemoveCount = false): Array<TagDesc> {
    const values: Array<TagDesc> = [];
    for (const [catName, tagsObj] of Object.entries(catTags)) {
        for (const [tagName, tagInfo] of Object.entries(tagsObj)) {
            const obj = { ...tagInfo, cat: catName, tag: tagName };
            if (isRemoveCount) {
                delete obj.prompt;
                delete obj.negative;
            }
            values.push(obj);
        }
    }
    return values;
}

export function exportData(catTags: CatTags, selectedCats?: Array<string>): CatTags {
    const data: CatTags = {};
    for (const [catName, tagsObj] of Object.entries(catTags)) {
        if (Array.isArray(selectedCats) && !selectedCats.includes(catName)) continue;
        data[catName] = tagsObj;
        for (const [tagName, tagInfo] of Object.entries(tagsObj)) {
            data[catName][tagName] = { ...tagInfo };
            delete data[catName][tagName].prompt;
            delete data[catName][tagName].negative;
        }
    }
    return data;
}

export async function importData(json: string) {
    let data = JSON.parse(json);

    for (const [catName, tagsObj] of Object.entries(data)) {
        if (typeof tagsObj === "object")
            for (const [tagName, tagInfo] of Object.entries(tagsObj)) {
                if (typeof tagInfo === "object") data[catName][tagName] = { ...tagInfo, nonpreset: true };
            }
    }

    data = deepMerge(data, await loadTags());
    await saveTags(data);
}

export function generateOutput(PROP: TagType, catTags: CatTags, l?: string, r?: string): string {
    const values = tagsToTagsDesc(catTags).filter((tag) => tag[PROP] > 0);
    return values.map((tag) => strengthenWord(tag.tag, tag[PROP], l, r)).join(",");
}

/**
 * clean all PROMPT & NEGATIVE tags
 */
export async function clearAll() {
    await localforage.clear();
    await saveTags();
}
