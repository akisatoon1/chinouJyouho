export { compress };

// 空白と改行を削除する
function compress(json: string) {
    return json.replace(/\s+/g, '').replace(/>\s+</g, '><');
}
