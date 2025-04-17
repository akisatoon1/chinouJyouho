"use strict";
// 入力の種類を定義する
// ex) textarea, select, etc
const TypeText = "text";
const TypeOption = "option";
// local storageのキー
const StorageKey = "test";
// 小テストを表すdiv要素を返す
function getTestPaperEle() {
    return document.querySelector("div.querypaper");
}
// 新しく入力データを保存するため
// この動作を実行しないと、サイト側の操作によって新しい入力が自動で削除される
function preserve() {
    // 一時中断ボタンをクリックする
    const button = document.querySelector("input.back");
    button.click();
}
console.log("general.js loaded.");
