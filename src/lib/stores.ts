import { writable } from "svelte/store";
import { savePrompt, loadPrompt } from "./config";

export interface CatTags {
    [catName: string]: {
        [tagName: string]: number;
        // number = 0 means tag is not selected
        // negative numbers is prevented
    };
}

async function createTagsBindings() {
    const { subscribe, set, update } = writable<CatTags>(await loadPrompt());
    let actionCount = 0;
    const saveCount = 5;
    const save = (obj: CatTags) => {
        actionCount++;
        if (actionCount >= 5) {
            savePrompt(obj);
            actionCount = 0;
        }
    };

    return {
        subscribe,
        plus(catName: string, tagName: string) {
            update((catTags) => {
                catTags[catName][tagName]++;
                save(catTags);
                return catTags;
            });
        },
        minus(catName: string, tagName: string) {
            update((catTags) => {
                const lastCount = catTags[catName][tagName];
                if (lastCount < 1) return catTags;
                catTags[catName][tagName]--;
                save(catTags);
                return catTags;
            });
        },
        clear() {
            update((catTags) => {
                for (const catName in catTags) {
                    for (const tagName in catTags[catName]) {
                        catTags[catName][tagName] = 0;
                    }
                }
                save(catTags);
                return catTags;
            });
        },
    };
}

export const tags = await createTagsBindings();
