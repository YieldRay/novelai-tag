const KEY_PROMPT = "PROMPT";
const KEY_NEGATIVE = "NEGATIVE";

import type { CatTags, TagInfo } from "./stores";
import localforage from "localforage";
import useDeepMerge from "@fastify/deepmerge";
const deepMerge = useDeepMerge();

async function importPreset(): Promise<CatTags> {
    const { default: data } = (await import("../assets/tags")) as any;
    return data;
}

export function savePrompt(obj?: CatTags) {
    if (!obj) localforage.removeItem(KEY_PROMPT);
    return localforage.setItem(KEY_PROMPT, obj);
}

export async function loadPrompt(): Promise<CatTags> {
    const propmt = await localforage.getItem<CatTags>(KEY_PROMPT);
    if (!propmt) return await importPreset();
    return deepMerge(propmt, await importPreset());
}

export function saveNegative(obj?: CatTags) {
    if (!obj) localforage.removeItem(KEY_NEGATIVE);
    return localforage.setItem(KEY_NEGATIVE, obj);
}

export async function loadNegative(): Promise<CatTags> {
    const negative = await localforage.getItem<CatTags>(KEY_NEGATIVE);
    if (!negative) return await importPreset();
    return deepMerge(negative, await importPreset());
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
            const obj = { cat: catName, tag: tagName, count: tagInfo.count };
            if (isRemoveCount) delete obj.count;
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
            delete data[catName][tagName].count;
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

    data = deepMerge(data, await loadPrompt());

    await savePrompt(data);
    await saveNegative(data);
}

export function generateOutput(catTags: CatTags, l?: string, r?: string): string {
    const values = tagsToTagsDesc(catTags).filter(({ count }) => count > 0);
    return values.map(({ tag, count }) => strengthenWord(tag, count, l, r)).join(",");
}

/**
 * clean all PROMPT & NEGATIVE tags
 */
export async function clearAll() {
    await localforage.clear();
    await savePrompt();
    await saveNegative();
}
