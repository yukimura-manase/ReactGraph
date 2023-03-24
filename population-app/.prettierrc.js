module.exports = {
  printWidth: 120, // 折り返す行の長さを指定
  tabWidth: 2, // インデントのスペースの数を指定
  semi: false, // ステートメントの最後にセミコロンを追加
  parser: "typescript", // 使用するパーサーを指定
  arrowParens: "avoid", // アロー関数の()が省略可能でも常に書く => 省略可能なときは()を書かない(デフォルト)
  trailingComma: "es5", // 末尾のカンマの設定
};