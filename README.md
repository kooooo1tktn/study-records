# 学習記録アプリ
## このアプリでできること 🎯
- 勉強した内容を記録できます
- 勉強時間を自動で計算してくれます
- 記録の削除もカンタンにできます

## アプリの使い方 📱
1. 「今日やった勉強」を書き込む
2. 「勉強時間」を入れる
3. 保存ボタンを押す
4. これで記録完了！

## アプリを動かすために必要なもの 🔨
- パソコンにNode.jsをインストール（バージョン18以上）
- npmをインストール（バージョン9以上）

## アプリの準備方法 🚀

### 1. アプリをパソコンに取り込む
```bash
git clone https://github.com/yourusername/study-records.git](https://github.com/kooooo1tktn/Study-Records.git
cd Study-Records
```

### 2. 必要な設定をする
.envというファイルを作る
中に以下の情報を書く：
```bash
VITE_SUPABASE_URL=あなたのSupabase URL
VITE_SUPABASE_ANON_KEY=あなたのSupabase キー
```

### 3. アプリを起動する
#### 準備する
```bash
npm install
```

#### 起動する
```bash
npm run dev
```
これで http://localhost:5173 にアクセスすると使えます！

#### テストをする
```bash
npm test
```

#### アプリを公開用に準備する
```bash
npm run build
```
