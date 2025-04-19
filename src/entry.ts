function realPath(path: string) {
    const prefix: string = "js/inserted/";
    return `${prefix}${path}`;
}

const buttonGet: HTMLButtonElement = document.querySelector("button#get") as HTMLButtonElement;
const buttonInsert: HTMLButtonElement = document.querySelector("button#insert") as HTMLButtonElement;
const buttonClear: HTMLButtonElement = document.querySelector("button#clear") as HTMLButtonElement;

// 小テストのデータを取得して保存する
buttonGet.addEventListener("click", async () => {
    const tabId: number = await getCurrentTabId();
    chrome.scripting
        .executeScript({
            target: { tabId: tabId },
            files: [realPath("get.js")],
        })
});

// 小テストのデータを入力する
buttonInsert.addEventListener("click", async () => {
    const tabId: number = await getCurrentTabId();
    chrome.scripting
        .executeScript({
            target: { tabId: tabId },
            files: [realPath("insert.js")],
        })
});

// 小テストのデータを入力する
buttonClear.addEventListener("click", async () => {
    const tabId: number = await getCurrentTabId();
    chrome.scripting
        .executeScript({
            target: { tabId: tabId },
            files: [realPath("clear.js")],
        })
});

async function getCurrentTabId(): Promise<number> {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id as number;
}

console.log("entry.js loaded.")