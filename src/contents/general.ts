// 入力の種類を定義する
// ex) textarea, select, etc
const TypeText: string = "text";
const TypeOption: string = "option";

// local storageのキー
const StorageKey: string = "test";

// ページ内のinputタグを見つけて, 値を入力するため
interface input {
    qid: string,
    type: string,   // "string" or "option"
    text?: string,  // if text == "string"
    value?: string  // if text == "option"
}

// local storage内でのデータ形式
interface storageData {
    [StorageKey]: input[]
}

// 小テストを表すdiv要素を返す
function getTestPaperEle(): HTMLDivElement | null {
    return document.querySelector("div.querypaper");
}

// 新しく入力データを保存するため
// この動作を実行しないと、サイト側の操作によって新しい入力が自動で削除される
function preserve(): void {
    // 一時中断ボタンをクリックする
    const button: HTMLInputElement = document.querySelector("input.back") as HTMLInputElement;
    button.click();
}

console.log("general.js loaded.")