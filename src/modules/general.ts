/**
 * moduleで使う共通の型や値をまとめている
 */

export { TypeText, TypeSelect, input, storageData }

// 入力の種類を定義する
// ex) textarea, select, etc
const TypeText: string = "text";
const TypeSelect: string = "select";

// ページ内のinputタグを見つけて, 値を入力するため
interface input {
    qid: string,
    type: string,    // "text" or "select"
    text?: string,   // if type == "text"
    option?: {       // if type == "select"
        isSelected: boolean,
        value: string
    }
}

// local storage内でのデータ形式
interface storageData {
    test: input[]
}
