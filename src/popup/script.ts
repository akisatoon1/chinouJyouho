import { buttonGet, buttonInsert, buttonClear, radioManual, jsonInput } from './elements';
import { saveToStorage } from '../modules/storage';
import { Input } from '../modules/general';

function realPath(path: string) {
    const prefix: string = "js/inserted/";
    return `${prefix}${path}`;
}

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

    if (radioManual.checked) {
        // 手動入力モード: テキストエリアの内容を処理
        const inputData = JSON.parse(jsonInput.value) as Input[];
        // ストレージにデータを保存
        await saveToStorage(inputData);
    }

    chrome.scripting
        .executeScript({
            target: { tabId: tabId },
            files: [realPath("insert.js")],
        });
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

console.log("script.js loaded."); 