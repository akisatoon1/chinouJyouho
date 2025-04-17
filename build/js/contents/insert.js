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
function getFromStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield chrome.storage.local.get([StorageKey]);
        return result[StorageKey];
    });
}
// 入力の要素を見つけるため
function getSelector(ipt) {
    return `[name=${ipt.qid}]`;
}
function insert(data) {
    // 小テストの入力を全て含む要素
    // 要素が存在しない場合は終了
    const test = getTestPaperEle();
    if (test === null)
        return;
    // 全てのデータを入力する
    for (const ipt of data) {
        // 共通のセレクタを使う
        const selector = getSelector(ipt);
        switch (ipt.type) {
            case TypeText:
                // input要素を見つける
                const inputEle = test.querySelector(selector);
                // 答えの更新
                inputEle.value = ipt.text;
                break;
            case TypeOption:
                // select要素を見つける
                const selectEle = test.querySelector(selector);
                // 選択された選択肢を入力する
                const optionEle = selectEle.querySelector(`option[value='${ipt.value}']`);
                optionEle.setAttribute("selected", "null");
                break;
        }
    }
}
// local storageから小テストの答えを取得し、サイトに入力する
(() => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = yield getFromStorage();
    insert(inputs);
    alert("挿入しました");
    preserve();
}))();
console.log("insert.js loaded.");
