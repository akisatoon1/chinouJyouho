"use strict";
function get() {
    // 小テストの入力を全て含む要素
    // 要素が存在しない場合は終了
    const test = getTestPaperEle();
    if (test === null)
        return [];
    const textInputEles = test.querySelectorAll("input.queryinput");
    const selectInputEles = test.querySelectorAll("select.pulldownselection");
    let inputs = [];
    // 入力されたテキストを集める
    for (const ipt of textInputEles) {
        const qid = ipt.name;
        const text = ipt.value;
        inputs.push({
            qid: qid,
            type: TypeText,
            text: text
        });
    }
    // 選択された選択肢をあつめる
    for (const ipt of selectInputEles) {
        // 選択されたoption要素を取得する
        // 何も選択されていない場合は入力データに含まない
        const selectedEle = ipt.querySelector("option[selected]");
        if (selectedEle === null)
            continue;
        /**
         *
         * 選んでいないという選択も保存すべき
         *
         */
        const qid = ipt.name;
        inputs.push({
            qid: qid,
            type: TypeOption,
            value: selectedEle.value
        });
    }
    return inputs;
}
function saveToStorage(data) {
    const setData = { [StorageKey]: data };
    chrome.storage.local.set(setData).then(() => {
        alert("ストレージに保存しました");
    });
}
// 小テストのデータを取得し、local storageに保存する
saveToStorage(get());
console.log("get.js loaded.");
