import { writable, derived } from "svelte/store";
import { saveTags, generateOutput, loadTags } from "./config";

export interface TagInfo {
    // if `prompt`|`negative` is unset, equal to it's zero
    // number = 0 means tag is not selected
    // negative numbers is prevented
    prompt?: number;
    negative?: number;
    cn?: string;
    nonpreset?: boolean;
}
export interface CatTags {
    // tags seprated in cats
    [catName: string]: {
        [tagName: string]: TagInfo;
    };
}

export type TagType = "prompt" | "negative";

async function createTagsStore(tagsSource: CatTags) {
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
        plus(PROP: TagType, cat: string, tag: string) {
            update((tags) => {
                if (!tags[cat][tag][PROP]) tags[cat][tag][PROP] = 0;
                tags[cat][tag][PROP]++;
                save(tags);
                return tags;
            });
        },
        minus(PROP: TagType, cat: string, tag: string) {
            update((tags) => {
                if (!tags[cat][tag][PROP]) tags[cat][tag][PROP] = 0;
                const lastCount = tags[cat][tag][PROP];
                if (lastCount < 1) return tags;
                tags[cat][tag][PROP]--;
                save(tags);
                return tags;
            });
        },
        reset(PROP: TagType, cat?: string, tag?: string) {
            // reset selected tag
            if (cat && tag)
                update((tags) => {
                    tags[cat][tag][PROP] = 0;
                    return tags;
                });
            // reset all tags
            else
                update((tags) => {
                    for (const cat in tags) {
                        for (const tag in tags[cat]) {
                            tags[cat][tag][PROP] = 0;
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
export function createTagsString(PROP: TagType, tagsStore: TagsStore) {
    return derived([tagsStore, bracketsStore], ([$tagsStore, $bracketsStore]) =>
        generateOutput(PROP, $tagsStore, ...$bracketsStore)
    );
}

export function createCatsStore(tagsStore: TagsStore) {
    return derived(tagsStore, ($tagsStore) => Object.keys($tagsStore));
}

export const tagsStorePromise = (async () => createTagsStore(await loadTags()))();
