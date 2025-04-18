/**
 * moduleで使う共通の型や値をまとめている
 */

export { TypeText, TypeOption, StorageKey, input, storageData }

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
