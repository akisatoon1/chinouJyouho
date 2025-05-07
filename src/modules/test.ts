/**
 * 小テストのページに関する操作を行う
 */

import { Input, TextInput, SelectInput, OlInput, TypeText, TypeSelect, TypeOl, ErrorInvalidPage } from "./general"
export { get, insert, clear, preserve }

// 小テストの既に入力されている値を取得する
function get(): Input[] {
    // 小テストの入力を全て含む要素
    // 要素が存在しない場合はエラーを投げる
    const test: HTMLDivElement | null = getTestPaperEle();
    if (test === null) throw ErrorInvalidPage;

    const textInputEles: NodeListOf<HTMLInputElement> = test.querySelectorAll("input.queryinput");
    const selectInputEles: NodeListOf<HTMLSelectElement> = test.querySelectorAll("select.pulldownselection");
    const olInputEles: NodeListOf<HTMLOListElement> = test.querySelectorAll("ol");

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
        const optionEles: NodeListOf<HTMLOptionElement> = ipt.querySelectorAll("option");

        // 選択されたoptionを取得する. 
        // 存在しない場合も記す
        let data: SelectInput = {
            qid: ipt.name,
            type: TypeSelect,
            option: {
                isSelected: false,
                value: ""
            }
        };
        for (const optionEle of optionEles) {
            if (optionEle.selected) {
                data = {
                    qid: ipt.name,
                    type: TypeSelect,
                    option: {
                        isSelected: true,
                        value: optionEle.value
                    }
                };
                break;
            }
        }
        inputs.push(data);
    }

    // radio or checkbox ボタンの選択肢を集める
    for (const ol of olInputEles) {
        const data: OlInput = {
            qid: ol.id,
            type: TypeOl,
            buttons: []
        };

        // radio or checkbox typeのinput要素の情報を集める
        const inputEles: NodeListOf<HTMLInputElement> = ol.querySelectorAll("input");
        for (const inputEle of inputEles) {
            data.buttons.push({
                isSelected: inputEle.checked,
                value: inputEle.value
            });
        }

        // ol要素の情報を取得データに加える
        inputs.push(data);
    }

    return inputs;
}

// 小テストに入力する
function insert(data: Input[]): void {
    // 小テストの入力を全て含む要素
    // 要素が存在しない場合はエラーを投げる
    const test: HTMLDivElement | null = getTestPaperEle();
    if (test === null) throw ErrorInvalidPage;

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

                if (ipt.option.isSelected) {
                    // 選択された選択肢があるならば、その選択肢を選択する
                    const optionEle: HTMLOptionElement = selectEle.querySelector(`option[value='${ipt.option.value}']`) as HTMLOptionElement;
                    optionEle.selected = true;
                }
                else {
                    // 選択された選択肢がないならば、選択を取り消す
                    const optionEles: NodeListOf<HTMLOptionElement> = selectEle.querySelectorAll(`option`);
                    for (const optionEle of optionEles) {
                        optionEle.selected = false;
                    }
                }
                break;

            case TypeOl:
                // ol要素を見つける
                // ここではidを使って探す
                const olEle: HTMLOListElement = test.querySelector(`#${ipt.qid}`) as HTMLOListElement;

                // 全てのradio or checkboxの選択状態を更新する
                for (const button of ipt.buttons) {
                    const inputEle: HTMLInputElement = olEle.querySelector(`input[value='${button.value}']`) as HTMLInputElement;
                    inputEle.checked = button.isSelected;
                }

                break;
        }
    }
}

// 小テストの入力を空にする
function clear(): void {
    // 小テストの入力を全て含む要素
    // 要素が存在しない場合はエラーを投げる
    const test: HTMLDivElement | null = getTestPaperEle();
    if (test === null) throw ErrorInvalidPage;

    const textInputEles: NodeListOf<HTMLInputElement> = test.querySelectorAll("input.queryinput");
    const selectInputEles: NodeListOf<HTMLSelectElement> = test.querySelectorAll("select.pulldownselection");
    const olInputEles: NodeListOf<HTMLOListElement> = test.querySelectorAll("ol");

    // 全ての入力を空にする
    for (const ipt of textInputEles) {
        // 空テキストを代入
        ipt.value = "";
    }
    for (const ipt of selectInputEles) {
        // 選択されたoptionが存在した場合は、選択を取り消す
        const optionEles: NodeListOf<HTMLOptionElement> = ipt.querySelectorAll("option");
        for (const optionEle of optionEles) {
            optionEle.selected = false;
        }
    }
    for (const ol of olInputEles) {
        // input要素ボタンの選択を全て取り消す
        const inputEles: NodeListOf<HTMLInputElement> = ol.querySelectorAll("input");
        for (const inputEle of inputEles) {
            inputEle.checked = false;
        }
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
