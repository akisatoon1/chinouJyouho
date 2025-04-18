import { getFromStorage } from "../modules/storage"
import { insert, preserve } from "../modules/test"

// local storageから小テストの答えを取得し、サイトに入力する
(async () => {
    const inputs = await getFromStorage();
    insert(inputs);
    alert("挿入しました");
    preserve();
})();

console.log("insert.js inserted.")