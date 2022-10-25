const data = {
    //! for test only
    catName1: {
        tag1: { cn: "标签1" },
        tag2: { cn: "标签2" },
        tag3: { cn: "标签3" },
    },
    catName2: {
        tag4: { cn: "标签4" },
        tag5: { cn: "标签5" },
    },
};

import type { Tag, Tags } from "../lib/stores";
interface Data {
    [catName: string]: {
        [tagName: string]: any;
    };
}
function modifyData(data: Data): Tags {
    const tags = {};
    for (const [catName, tagsObj] of Object.entries(data)) {
        for (const [tagName, tagObj] of Object.entries(tagsObj)) {
            tags[tagName] = { ...tagObj, cat: catName, count: 0 };
        }
    }
    return tags;
}

export default modifyData(data);
