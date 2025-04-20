/**
 * chrome local storageのデータについて取得や保存をする
 */

import { Input, storageData } from "./general"
export { getFromStorage, saveToStorage }

async function getFromStorage(): Promise<Input[]> {
    const result: storageData = await chrome.storage.local.get("test");
    return result.test;
}

function saveToStorage(data: Input[]): void {
    const setData: storageData = { test: data };
    chrome.storage.local.set(setData).then(() => {
        alert("ストレージに保存しました");
    });
}
