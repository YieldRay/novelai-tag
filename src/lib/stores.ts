import { writable, derived } from "svelte/store";
import { savePrompt, saveNegative, loadPrompt, loadNegative, generateOutput } from "./config";

export interface TagInfo {
    count?: number; // if `count` is unset, equal to it's zero
    // number = 0 means tag is not selected
    // negative numbers is prevented
    cn?: string;
}
export interface CatTags {
    // tags seprated in cats
    [catName: string]: {
        [tagName: string]: TagInfo;
    };
}

async function createTagsStore(tagsSource: CatTags, saveTags: typeof savePrompt) {
    const { subscribe, set, update } = writable<CatTags>(tagsSource);
    let actionCount = 0;
    const saveCount = 5;
    const save = (obj: CatTags) => {
        actionCount++;
        if (actionCount >= 5) {
            saveTags(obj);
            actionCount = 0;
        }
    };

    return {
        subscribe,
        plus(cat: string, tag: string) {
            update((tags) => {
                if (!tags[cat][tag].count) tags[cat][tag].count = 0;
                tags[cat][tag].count++;
                save(tags);
                return tags;
            });
        },
        minus(cat: string, tag: string) {
            update((tags) => {
                if (!tags[cat][tag].count) tags[cat][tag].count = 0;
                const lastCount = tags[cat][tag].count;
                if (lastCount < 1) return tags;
                tags[cat][tag].count--;
                save(tags);
                return tags;
            });
        },
        reset() {
            update((tags) => {
                for (const cat in tags) {
                    for (const tag in tags[cat]) {
                        tags[cat][tag].count = 0;
                    }
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
    return derived(tagsStore, ($tagsStore) => Object.keys($tagsStore));
}

export const promptTagsPromise = (async () => createTagsStore(await loadPrompt(), savePrompt))();
export const negativeTagsPromise = (async () => createTagsStore(await loadNegative(), saveNegative))();
