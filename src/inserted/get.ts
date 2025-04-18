import { saveToStorage } from "../modules/storage"
import { get } from "../modules/test"

// 小テストのデータを取得し、local storageに保存する
saveToStorage(get());

console.log("get.js inserted.")