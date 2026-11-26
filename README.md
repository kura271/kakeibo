# わが家の家計簿（ウェブアプリ版）

## ファイル
- index.html … アプリ本体
- manifest.webmanifest … アプリとしてインストールするための設定
- sw.js … 電波がなくても開けるようにする仕組み
- icons/ … アイコン

家計のデータはこのファイルには入りません（スマホのブラウザの中にだけ保存されます）。

## GitHub Pages で公開する手順
1. GitHub で新しいリポジトリを作る（例：kakeibo、Public）
2. 「Add file」→「Upload files」で、このフォルダの中身を全部アップロード（icons フォルダごと）
3. 「Settings」→「Pages」→ Branch を「main」「/(root)」にして Save
4. 数分後、https://ユーザー名.github.io/kakeibo/ で開けます

## スマホにインストール
- Android（Chrome）：URL を開く →「︙」→「アプリをインストール」（または「ホーム画面に追加」）
- iPhone（Safari）：URL を開く → 共有ボタン →「ホーム画面に追加」

## 更新するとき
index.html を差し替えたら、sw.js の 1 行目の VER（例：kakeibo-v1.11）も新しい番号に変えてアップロードします。
次にアプリを開いたとき、新しい版に切り替わります。
