import { ErrorInvalidPage } from "../modules/general"
import { clear, preserve } from "../modules/test"

// 元の入力を削除し、保存する
try {
    clear();
    console.log("データをクリアしました");
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

console.log("clear.ts inserted");