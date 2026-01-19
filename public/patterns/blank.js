export const blank = {
    pattern: [],
    title: "Blank",
    description: "An empty grid with no live cells. The standard for a new project.",
    lifeformsIncluded: [],
    tags: ["empty", "clear", "new"],
    searchTerms: ["blank", "empty", "clear", "new", "fresh start"]
};

for(let i = 0; i<50;i++){
    blank.pattern.push(new Array(50).fill(0));
}