/**
 * chrome local storageのデータについて取得や保存をする
 */

import { input, storageData, StorageKey } from "./general"
export { getFromStorage, saveToStorage }

async function getFromStorage(): Promise<input[]> {
    const result: storageData = await chrome.storage.local.get([StorageKey]);
    return result[StorageKey];
}

function saveToStorage(data: input[]): void {
    const setData: storageData = { [StorageKey]: data };
    chrome.storage.local.set(setData).then(() => {
        alert("ストレージに保存しました");
    });
}
