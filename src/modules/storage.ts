/**
 * chrome local storageのデータについて取得や保存をする
 */

import { Input, StorageData } from "./general"
export { getFromStorage, saveToStorage }

async function getFromStorage(): Promise<Input[]> {
    const result: StorageData = await chrome.storage.local.get("test");
    return result.test;
}

async function saveToStorage(data: Input[]): Promise<void> {
    const setData: StorageData = { test: data };
    await chrome.storage.local.set(setData);
}
