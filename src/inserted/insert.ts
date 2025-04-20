import { ErrorInvalidPage } from "../modules/general"
import { getFromStorage } from "../modules/storage"
import { insert, preserve } from "../modules/test"

// local storageから小テストの答えを取得し、サイトに入力する
(async () => {
    try {
        const inputs = await getFromStorage();
        insert(inputs);
        alert("挿入しました");
        preserve();
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
})();

console.log("insert.js inserted.")