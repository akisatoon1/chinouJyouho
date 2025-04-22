// ポップアップのUI要素
const radioAuto: HTMLInputElement = document.querySelector("input#auto") as HTMLInputElement;
const radioManual: HTMLInputElement = document.querySelector("input#manual") as HTMLInputElement;
const textInputContainer: HTMLDivElement = document.querySelector("div#textInput") as HTMLDivElement;

// 入力データを自動取得の時は、テキストエリアを非表示にする
radioAuto.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    textInputContainer.style.display = target.checked ? "none" : "block";
});

// 入力データを手動入力の時は、テキストエリアを表示する
radioManual.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    textInputContainer.style.display = target.checked ? "block" : "none";
}); 