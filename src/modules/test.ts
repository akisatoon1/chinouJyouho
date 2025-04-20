/**
 * 小テストのページに関する操作を行う
 */

import { Input, TextInput, SelectInput, TypeText, TypeSelect } from "./general"
export { get, insert, clear, preserve }

// 小テストの既に入力されている値を取得する
function get(): Input[] {
    // 小テストの入力を全て含む要素
    // 要素が存在しない場合は終了
    const test: HTMLDivElement | null = getTestPaperEle();
    if (test === null) return [];

    const textInputEles: NodeListOf<HTMLInputElement> = test.querySelectorAll("input.queryinput");
    const selectInputEles: NodeListOf<HTMLSelectElement> = test.querySelectorAll("select.pulldownselection");

    let inputs: Input[] = []

    // 入力されたテキストを集める
    for (const ipt of textInputEles) {
        const qid: string = ipt.name;
        const text: string = ipt.value;
        const data: TextInput = {
            qid: qid,
            type: TypeText,
            text: text
        };
        inputs.push(data);
    }

    // 選択された選択肢をあつめる
    for (const ipt of selectInputEles) {
        const selectedEle: HTMLOptionElement | null = ipt.querySelector("option[selected]");

        // 選択されたoption要素が存在しない場合は、選択されていないという選択を入力データに含める
        if (selectedEle === null) {
            const data: SelectInput = {
                qid: ipt.name,
                type: TypeSelect,
                option: {
                    isSelected: false,
                    value: ""
                }
            };
            inputs.push(data);
        }

        // 選択されたoption要素が存在する場合は、その選択肢を入力データに含める
        else {
            const data: SelectInput = {
                qid: ipt.name,
                type: TypeSelect,
                option: {
                    isSelected: true,
                    value: selectedEle.value
                }
            };
            inputs.push(data);
        }
    }

    return inputs;
}

// 小テストに入力する
function insert(data: Input[]): void {
    // 小テストの入力を全て含む要素
    // 要素が存在しない場合は終了
    const test: HTMLDivElement | null = getTestPaperEle();
    if (test === null) return;

    // 全てのデータを入力する
    for (const ipt of data) {
        // 共通のセレクタを使う
        const selector: string = `[name=${ipt.qid}]`;

        switch (ipt.type) {
            case TypeText:
                // input要素を見つける
                const inputEle: HTMLInputElement = test.querySelector(selector) as HTMLInputElement;

                // 答えの更新
                inputEle.value = ipt.text as string;
                break;

            case TypeSelect:
                // select要素を見つける
                const selectEle: HTMLSelectElement = test.querySelector(selector) as HTMLSelectElement;

                // TypeSelectの場合はoptionフィールドが存在する
                const option: { isSelected: boolean, value: string } = ipt.option as { isSelected: boolean, value: string };

                // 選択された選択肢があるならば、その選択肢を選択する
                if (option.isSelected) {
                    const optionEle: HTMLOptionElement = selectEle.querySelector(`option[value='${option.value}']`) as HTMLOptionElement;
                    optionEle.setAttribute("selected", "null");
                }

                // 選択された選択肢がないならば、選択を取り消す
                else {
                    const optionEle: HTMLOptionElement | null = selectEle.querySelector(`option[selected]`);
                    if (optionEle !== null) optionEle.removeAttribute("selected");
                }
                break;
        }
    }
}

// 小テストの入力を空にする
function clear(): void {
    // 小テストの入力を全て含む要素
    // 要素が存在しない場合は終了
    const test: HTMLDivElement | null = getTestPaperEle();
    if (test === null) return;

    const textInputEles: NodeListOf<HTMLInputElement> = test.querySelectorAll("input.queryinput");
    const selectInputEles: NodeListOf<HTMLSelectElement> = test.querySelectorAll("select.pulldownselection");

    // 全ての入力を空にする
    for (const ipt of textInputEles) {
        // 空テキストを代入
        ipt.value = "";
    }
    for (const ipt of selectInputEles) {
        // 選択されたoptionが存在した場合は、選択を取り消す
        const selectedEle: HTMLOptionElement | null = ipt.querySelector("option[selected]");
        if (selectedEle !== null) selectedEle.removeAttribute("selected");
    }
}

// 新しく入力データを保存するため
// この動作を実行しないと、サイト側の操作によって新しい入力が自動で削除される
function preserve(): void {
    // 一時中断ボタンをクリックする
    const button: HTMLInputElement = document.querySelector("input.back") as HTMLInputElement;
    button.click();
}

/**
 * 他の関数で使う共通の処理
 */

// 小テストを表すdiv要素を返す
function getTestPaperEle(): HTMLDivElement | null {
    return document.querySelector("div.querypaper");
}

