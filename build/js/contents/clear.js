"use strict";
function clear() {
    // 小テストの入力を全て含む要素
    // 要素が存在しない場合は終了
    const test = getTestPaperEle();
    if (test === null)
        return;
    const textInputEles = test.querySelectorAll("input.queryinput");
    const selectInputEles = test.querySelectorAll("select.pulldownselection");
    // 全ての入力を空にする
    for (const ipt of textInputEles) {
        // 空テキストを代入
        ipt.value = "";
    }
    for (const ipt of selectInputEles) {
        // 選択されたoptionが存在した場合は、選択を取り消す
        const selectedEle = ipt.querySelector("option[selected]");
        if (selectedEle !== null)
            selectedEle.removeAttribute("selected");
    }
}
// 元の入力を削除し、保存する
clear();
alert("データをクリアしました");
preserve();
console.log("clear.ts");
