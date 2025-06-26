import { ErrorInvalidPage } from "../modules/general"
import { saveToStorage } from "../modules/storage"
import { get } from "../modules/test"
import { compress } from "../modules/compress"

// データをJSON文字列に変換してページに表示する
function displayTestData(data: object) {
    const jsonString = compress(JSON.stringify(data, null, 2));

    // ページに表示用の要素を追加
    const displayDiv = document.createElement('div');
    displayDiv.style.cssText = 'position: fixed; top: 10px; right: 10px; background: white; padding: 10px; border: 1px solid black; max-height: 50vh; overflow-y: auto;';

    // タイトルとコピーボタンを横に並べるコンテナ
    const headerContainer = document.createElement('div');
    headerContainer.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;';

    // タイトルを追加
    const title = document.createElement('h3');
    title.textContent = '取得した小テストデータ';
    title.style.margin = '0';
    headerContainer.appendChild(title);

    // コピーボタンを追加
    const copyButton = document.createElement('button');
    copyButton.textContent = 'コピー';
    copyButton.style.cssText = 'padding: 5px 10px; cursor: pointer;';
    copyButton.onclick = () => {
        navigator.clipboard.writeText(jsonString).then(() => {
            copyButton.textContent = 'コピーしました！';
            setTimeout(() => {
                copyButton.textContent = 'コピー';
            }, 2000);
        });
    };
    headerContainer.appendChild(copyButton);

    displayDiv.appendChild(headerContainer);

    document.body.appendChild(displayDiv);
}

// 小テストのデータを取得し、local storageに保存する
try {
    const data = get();

    displayTestData(data);

    saveToStorage(data).then(() => {
        console.log("ストレージに保存しました");
    });
} catch (error) {
    if (error === ErrorInvalidPage) {
        console.error("小テストのページで実行して下さい:", error);
        alert("小テストのページで実行して下さい");
    }
    else {
        console.error("エラーが発生しました:", error);
        alert("エラーが発生しました");
    }
}

console.log("get.js inserted.")