const KEY_PROMPT = "PROMPT";
const KEY_NEGATIVE = "NEGATIVE";
import type { CatTags } from "./stores";
import localforage from "localforage";

export function savePrompt(obj: CatTags) {
    return localforage.setItem(KEY_PROMPT, obj);
}

export async function loadPrompt(): Promise<CatTags> {
    return (
        (await localforage.getItem(KEY_PROMPT)) || {
            testCatA: { testTagA1: 0, testTagA2: 0 },
            testCatB: { testTagB1: 0 },
            testCatC: { testTagC1: 0 },
            testCatD: { testTagD1: 0 },
            testCatE: { testTagE1: 0 },
            testCatF: { testTagF1: 0 },
        }
    );
}

export function saveNegative(obj: CatTags) {
    return localforage.setItem(KEY_NEGATIVE, obj);
}

export async function loadNegative(): Promise<CatTags> {
    return (
        (await localforage.getItem(KEY_NEGATIVE)) || {
            testCatA: { testTagA1: 0, testTagA2: 0 },
            testCatB: { testTagB1: 0 },
            testCatC: { testTagC1: 0 },
            testCatD: { testTagD1: 0 },
            testCatE: { testTagE1: 0 },
            testCatF: { testTagF1: 0 },
        }
    );
}

function strengthenWord(str: string, count: number, l = "{", r = "}"): string {
    if (count <= 0) return "";
    if (count === 1) return str;
    return l.repeat(count) + str + r.repeat(count);
}

export function generateOutput(obj: CatTags): string {
    const tagsArr = Object.values(obj);
    const allTags: Array<[string, number]> = [];
    tagsArr.forEach((x) => allTags.push(...Object.entries(x)));
    return allTags
        .filter(([k, v]) => v > 0)
        .map(([k, v]) => strengthenWord(k, v))
        .join(",");
}
