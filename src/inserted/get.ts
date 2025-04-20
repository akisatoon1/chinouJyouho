import { ErrorInvalidPage } from "../modules/general"
import { saveToStorage } from "../modules/storage"
import { get } from "../modules/test"

// 小テストのデータを取得し、local storageに保存する
try {
    saveToStorage(get());
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