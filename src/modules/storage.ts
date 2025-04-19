/**
 * chrome local storageのデータについて取得や保存をする
 */

import { input, storageData } from "./general"
export { getFromStorage, saveToStorage }

async function getFromStorage(): Promise<input[]> {
    const result: storageData = await chrome.storage.local.get("test");
    return result.test;
}

function saveToStorage(data: input[]): void {
    const setData: storageData = { test: data };
    chrome.storage.local.set(setData).then(() => {
        alert("ストレージに保存しました");
    });
}
