import { radioAuto, radioManual, textInputContainer } from './elements';

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