import { writable, derived } from "svelte/store";
import { savePrompt, saveNegative, loadPrompt, loadNegative, generateOutput } from "./config";

export interface Tag {
    cat: string;
    count: number;
    // number = 0 means tag is not selected
    // negative numbers is prevented
    cn?: string;
}

export interface Tags {
    [tagName: string]: Tag;
}

async function createTagsStore(tagsSource: Tags, saveTags: typeof savePrompt) {
    const { subscribe, set, update } = writable<Tags>(tagsSource);
    let actionCount = 0;
    const saveCount = 5;
    const save = (obj: Tags) => {
        actionCount++;
        if (actionCount >= 5) {
            saveTags(obj);
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
        reset() {
            update((tags) => {
                for (const tagName in tags) {
                    tags[tagName].count = 0;
                }
                save(tags);
                return tags;
            });
        },
        clear() {
            set({});
        },
    };
}

//! brackets
export const bracketsStore = writable<[string, string]>(["{", "}"]);

export type TagsStore = Awaited<ReturnType<typeof createTagsStore>>;

//! generate tags string via prompt/negative and depends on brackets
export function createTagsString(tagsStore: TagsStore) {
    return derived([tagsStore, bracketsStore], ([$tagsStore, $bracketsStore]) =>
        generateOutput($tagsStore, ...$bracketsStore)
    );
}

export function createCatsStore(tagsStore: TagsStore) {
    return derived(tagsStore, ($tagsStore) => [...new Set(Object.values($tagsStore).map((t) => t.cat))]);
}

export interface TagDesc extends Tag {
    tag: string;
}
export function createTagsDescStore(tagsStore: TagsStore) {
    return derived(tagsStore, ($tagsStore) => Object.entries($tagsStore).map(([tag, tagObj]) => ({ tag, ...tagObj })));
}

export const promptTagsPromise = (async () => createTagsStore(await loadPrompt(), savePrompt))();
export const negativeTagsPromise = (async () => createTagsStore(await loadNegative(), saveNegative))();
