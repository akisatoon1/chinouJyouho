/**
 * moduleで使う共通の型や値をまとめている
 */

export { TypeText, TypeSelect, Input, TextInput, SelectInput, storageData, ErrorInvalidPage }

// エラー定義
const ErrorInvalidPage: Error = new Error("Invalid page");

/**
 * 入力のhtml要素はid属性で一意に識別できる.
 * id属性の値は'qid3'のように, 'qid'と数字からなる.
 * 入力の要素はは複数種類のhtml要素に分けられる.
 */

// 入力の種類を定義する
// ex) textarea, select, etc
const TypeText = "text";
const TypeSelect = "select";

// 入力要素は全てqidで識別される
interface BaseInput {
    qid: string,
    type: string    // "text" or "select"
}

// input要素
interface TextInput extends BaseInput {
    type: typeof TypeText,
    text: string
}

// select要素
interface SelectInput extends BaseInput {
    type: typeof TypeSelect,
    option: {
        isSelected: boolean,
        value: string
    }
}

type Input = TextInput | SelectInput

// local storage内でのデータ形式
interface storageData {
    test: Input[]
}
