"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function realPath(path) {
    const prefix = "js/contents";
    return `${prefix}${path}`;
}
const buttonGet = document.querySelector("button#get");
const buttonInsert = document.querySelector("button#insert");
const buttonClear = document.querySelector("button#clear");
// 小テストのデータを取得して保存する
buttonGet.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const tabId = yield getCurrentTabId();
    chrome.scripting
        .executeScript({
        target: { tabId: tabId },
        files: [realPath("/general.js"), realPath("/get.js")],
    });
}));
// 小テストのデータを入力する
buttonInsert.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const tabId = yield getCurrentTabId();
    chrome.scripting
        .executeScript({
        target: { tabId: tabId },
        files: [realPath("/general.js"), realPath("/insert.js")],
    });
}));
// 小テストのデータを入力する
buttonClear.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const tabId = yield getCurrentTabId();
    chrome.scripting
        .executeScript({
        target: { tabId: tabId },
        files: [realPath("/general.js"), realPath("/clear.js")],
    });
}));
function getCurrentTabId() {
    return __awaiter(this, void 0, void 0, function* () {
        let queryOptions = { active: true, lastFocusedWindow: true };
        // `tab` will either be a `tabs.Tab` instance or `undefined`.
        let [tab] = yield chrome.tabs.query(queryOptions);
        return tab.id;
    });
}
console.log("entry.js loaded.");
