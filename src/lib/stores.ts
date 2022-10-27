import { writable, derived } from "svelte/store";
import { savePrompt, saveNegative, loadPrompt, loadNegative, generateOutput } from "./config";

export interface TagInfo {
    count?: number; // if `count` is unset, equal to it's zero
    // number = 0 means tag is not selected
    // negative numbers is prevented
    cn?: string;
    nonpreset?: boolean;
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
        if (actionCount >= saveCount) {
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
        reset(cat?: string, tag?: string) {
            if (cat && tag)
                update((tags) => {
                    tags[cat][tag].count = 0;
                    return tags;
                });
            else
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
        add(cat: string, tag: string, info: TagInfo) {
            update((tags) => {
                if (tags?.[cat]?.[tag]) return tags;
                if (!tags[cat]) tags[cat] = {};
                tags[cat][tag] = { ...info, nonpreset: true };
                console.log(tags[cat][tag]);
                //! This func is only for use add !
                return tags;
            });
        },
        remove(cat: string, tag?: string) {
            update((tags) => {
                if (!tag) delete tags[cat];
                if (tags[cat][tag].nonpreset) delete tags[cat][tag];
                //! same as above !
                return tags;
            });
        },
        clear() {
            set({});
        },
        set,
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
