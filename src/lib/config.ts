const KEY_PROMPT = "PROMPT";
const KEY_NEGATIVE = "NEGATIVE";
import type { Tags } from "./stores";
import localforage from "localforage";
import { PROMPT, NEGATIVE } from "./tags";

export function savePrompt(obj: Tags) {
    return localforage.setItem(KEY_PROMPT, obj);
}

function mergeTags(older: Tags, newer: Tags): Tags {
    const olderTags = Object.keys(older);
    const newerTags = Object.keys(newer);
    for (const tagName of newerTags) {
        if (olderTags.includes(tagName)) continue;
        olderTags[tagName] = newerTags[tagName];
    }
    return older;
}

export async function loadPrompt(): Promise<Tags> {
    const propmt = await localforage.getItem<Tags>(KEY_PROMPT);
    if (!propmt) return PROMPT;
    return mergeTags(propmt, PROMPT);
}

export function saveNegative(obj: Tags) {
    return localforage.setItem(KEY_NEGATIVE, obj);
}

export async function loadNegative(): Promise<Tags> {
    const negative = await localforage.getItem<Tags>(KEY_NEGATIVE);
    if (!negative) return NEGATIVE;
    return mergeTags(negative, NEGATIVE);
}

function strengthenWord(str: string, count: number, l = "{", r = "}"): string {
    if (count <= 0) return "";
    if (count === 1) return str;
    return l.repeat(count) + str + r.repeat(count);
}

export function generateOutput(tags: Tags, l?: string, r?: string): string {
    return Object.entries(tags)
        .filter(([tagName, tagObj]) => tagObj.count > 0)
        .map(([tagName, tagObj]) => strengthenWord(tagName, tagObj.count, l, r))
        .join(",");
}
