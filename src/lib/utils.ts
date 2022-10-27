import type { CatTags, TagInfo, TagType } from "./stores";

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
            const obj = { ...tagInfo, cat: catName, tag: tagName };
            if (isRemoveCount) {
                delete obj.prompt;
                delete obj.negative;
            }
            values.push(obj);
        }
    }
    return values;
}

export function generateOutput(PROP: TagType, catTags: CatTags, l?: string, r?: string): string {
    const values = tagsToTagsDesc(catTags).filter((tag) => tag[PROP] > 0);
    return values.map((tag) => strengthenWord(tag.tag, tag[PROP], l, r)).join(",");
}
