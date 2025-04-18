async function getFromStorage(): Promise<input[]> {
    const result: storageData = await chrome.storage.local.get([StorageKey]);
    return result[StorageKey];
}

// 入力の要素を見つけるため
function getSelector(ipt: input): string {
    return `[name=${ipt.qid}]`;
}

function insert(data: input[]): void {
    // 小テストの入力を全て含む要素
    // 要素が存在しない場合は終了
    const test: HTMLDivElement | null = getTestPaperEle();
    if (test === null) return;

    // 全てのデータを入力する
    for (const ipt of data) {
        // 共通のセレクタを使う
        const selector: string = getSelector(ipt);

        switch (ipt.type) {
            case TypeText:
                // input要素を見つける
                const inputEle: HTMLInputElement = test.querySelector(selector) as HTMLInputElement;

                // 答えの更新
                inputEle.value = ipt.text as string;
                break;

            case TypeOption:
                // select要素を見つける
                const selectEle: HTMLSelectElement = test.querySelector(selector) as HTMLSelectElement;

                // 選択された選択肢を入力する
                const optionEle: HTMLOptionElement = selectEle.querySelector(`option[value='${ipt.value}']`) as HTMLOptionElement;
                optionEle.setAttribute("selected", "null");
                break;
        }
    }
}
