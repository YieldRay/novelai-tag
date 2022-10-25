const KEY_PROMPT = "PROMPT";
const KEY_NEGATIVE = "NEGATIVE";

import type { Tags } from "./stores";
import localforage from "localforage";

// import Data from "../assets/tagsData";
import _Data from "../assets/tags";
const Data: Tags = _Data as Tags;

export function savePrompt(obj?: Tags) {
    if (!obj) localforage.removeItem(KEY_PROMPT);
    return localforage.setItem(KEY_PROMPT, obj);
}

function mergeTags(older: Tags, newer: Tags): Tags {
    const olderTags = Object.keys(older);
    const newerTags = Object.keys(newer);
    for (const tagName of newerTags) {
        if (olderTags.includes(tagName)) continue;
        older[tagName] = newer[tagName];
    }
    return older;
}

export async function loadPrompt(): Promise<Tags> {
    const propmt = await localforage.getItem<Tags>(KEY_PROMPT);
    if (!propmt) return Data;
    return mergeTags(propmt, Data);
}

export function saveNegative(obj?: Tags) {
    if (!obj) localforage.removeItem(KEY_NEGATIVE);
    return localforage.setItem(KEY_NEGATIVE, obj);
}

export async function loadNegative(): Promise<Tags> {
    const negative = await localforage.getItem<Tags>(KEY_NEGATIVE);
    if (!negative) return Data;
    return mergeTags(negative, Data);
}

function strengthenWord(str: string, count: number, l = "{", r = "}"): string {
    if (count <= 0) return "";
    if (count === 1) return str;
    return l.repeat(count - 1) + str + r.repeat(count - 1);
}

export function generateOutput(tags: Tags, l?: string, r?: string): string {
    return Object.entries(tags)
        .filter(([tagName, tagObj]) => tagObj.count > 0)
        .map(([tagName, tagObj]) => strengthenWord(tagName, tagObj.count, l, r))
        .join(",");
}

/**
 * clean all PROMPT & NEGATIVE tags
 */
export async function clearAll() {
    await localforage.clear();
    await savePrompt();
    await saveNegative();
}
