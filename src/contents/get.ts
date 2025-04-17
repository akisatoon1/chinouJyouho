function get(): input[] {
    // 小テストの入力を全て含む要素
    // 要素が存在しない場合は終了
    const test: HTMLDivElement | null = getTestPaperEle();
    if (test === null) return [];

    const textInputEles: NodeListOf<HTMLInputElement> = test.querySelectorAll("input.queryinput");
    const selectInputEles: NodeListOf<HTMLSelectElement> = test.querySelectorAll("select.pulldownselection");

    let inputs: input[] = []

    // 入力されたテキストを集める
    for (const ipt of textInputEles) {
        const qid: string = ipt.name;
        const text: string = ipt.value;
        inputs.push({
            qid: qid,
            type: TypeText,
            text: text
        })
    }

    // 選択された選択肢をあつめる
    for (const ipt of selectInputEles) {
        // 選択されたoption要素を取得する
        // 何も選択されていない場合は入力データに含まない
        const selectedEle: HTMLOptionElement | null = ipt.querySelector("option[selected]");
        if (selectedEle === null) continue;
        /**
         * 
         * 選んでいないという選択も保存すべき
         * 
         */

        const qid: string = ipt.name;
        inputs.push({
            qid: qid,
            type: TypeOption,
            value: selectedEle.value
        })
    }
    return inputs;
}

function saveToStorage(data: input[]): void {
    const setData: storageData = { [StorageKey]: data };
    chrome.storage.local.set(setData).then(() => {
        alert("ストレージに保存しました");
    });
}

// 小テストのデータを取得し、local storageに保存する
saveToStorage(get());

console.log("get.js loaded.")