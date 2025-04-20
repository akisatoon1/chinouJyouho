/**
 * chrome local storageのデータについて取得や保存をする
 */

import { Input, storageData } from "./general"
export { getFromStorage, saveToStorage }

async function getFromStorage(): Promise<Input[]> {
    const result: storageData = await chrome.storage.local.get("test");
    return result.test;
}

async function saveToStorage(data: Input[]): Promise<void> {
    const setData: storageData = { test: data };
    await chrome.storage.local.set(setData);
}
