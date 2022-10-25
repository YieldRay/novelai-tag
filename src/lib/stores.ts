import { writable } from "svelte/store";
import { savePrompt, loadPrompt, loadNegative } from "./config";

export interface Tag {
    cat: string;
    count: number;
    // number = 0 means tag is not selected
    // negative numbers is prevented
}

export interface Tags {
    [tagName: string]: Tag;
}

export interface TagDesc extends Tag {
    tag: string;
}

export function tagsToTagsDesc(tags: Tags): Array<TagDesc> {
    return Object.entries(tags).map(([tag, tagObj]) => ({ tag, ...tagObj }));
}

export function tagsToCats(tags: Tags): Array<string> {
    return [...new Set(Object.values(tags).map((t) => t.cat))];
}

async function createTagsStore(tagsSource: Tags) {
    const { subscribe, set, update } = writable<Tags>(tagsSource);
    let actionCount = 0;
    const saveCount = 5;
    const save = (obj: Tags) => {
        actionCount++;
        if (actionCount >= 5) {
            savePrompt(obj);
            actionCount = 0;
        }
    };

    return {
        subscribe,
        plus(tagName: string) {
            update((tags) => {
                tags[tagName].count++;
                save(tags);
                return tags;
            });
        },
        minus(tagName: string) {
            update((tags) => {
                const lastCount = tags[tagName].count;
                if (lastCount < 1) return tags;
                tags[tagName].count--;
                save(tags);
                return tags;
            });
        },
        clear() {
            update((tags) => {
                for (const tagName in tags) {
                    tags[tagName].count = 0;
                }
                save(tags);
                return tags;
            });
        },
    };
}

export const promptTagsPromise = (async () => createTagsStore(await loadPrompt()))();
export type TagsStore = Awaited<ReturnType<typeof createTagsStore>>;
export const negativeTagsPromise = (async () => createTagsStore(await loadNegative()))();
