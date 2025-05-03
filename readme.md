# WildRift Champion Data 🎮

# このプロジェクトは[WildRift-Merged-Champion-Data](https://github.com/ry2x/WildRift-Merged-Champion-Data)へ移管しました。
# This Project Has Moved to [WildRift-Merged-Champion-Data](https://github.com/ry2x/WildRift-Merged-Champion-Data).

> English version is available [here](https://github.com/ry2x/WildRift-Champs/blob/master/readme.en.md)

## 概要 📝

このリポジトリは、WildRift のチャンピオンデータを管理しているよ！
データは中国の API と[チャンピオンデータ](https://github.com/ry2x/wildrift_data)から取得して作られているんだ ✨

毎日 UTC 00:00 に新しいデータが公開されるよ！

## データの確認方法 🔍

チャンピオンデータは[gh-pages](https://github.com/ry2x/WildRift-Champs/tree/gh-pages)ブランチで確認できるよ！

## バグ報告 🐛

もしデータに誤りを見つけたら、[issue](https://github.com/ry2x/WildRift-Champs/issues)を立てて教えてね！
（[このリポジトリ](https://github.com/ry2x/wildrift_data)の JSON ファイルも修正が必要かもしれないよ。PR はいつでも歓迎だよ！）

## API としての使い方 🚀

エンドポイント: `https://ry2x.github.io/WildRift-Champs/`

### hero.json

チャンピオンの基本情報が入っている JSON ファイルだよ！

- URL: `https://ry2x.github.io/WildRift-Champs/hero.json`

- データ構造:

```ts
interface MergedChamp {
  id: string; // LOL APIのチャンピオンID
  key: number; // LOL APIのチャンピオンキー
  name: string; // チャンピオン名（日本語）
  title: string; // タイトル（日本語）
  describe: string; // 説明（日本語）
  is_fighter: boolean; // ファイタータグ
  is_mage: boolean; // メイジタグ
  is_assassin: boolean; // アサシンタグ
  is_marksman: boolean; // マークスマンタグ
  is_support: boolean; // サポートタグ
  is_tank: boolean; // タンクタグ
  type: string; // マナタイプ（日本語）
  is_wr: boolean; // WildRiftで利用可能か
  is_mid: boolean; // ミッドレーン
  is_top: boolean; // トップレーン
  is_jg: boolean; // ジャングル
  is_sup: boolean; // サポート
  is_ad: boolean; // AD
  is_free: boolean; // 今週の無料チャンピオン
  difficult: number; // 難易度
  damage: number; // ダメージ量
  survive: number; // 生存能力
  utility: number; // ユーティリティ
  hero_id: number; // LOLM APIのチャンピオンID
}
```

## 中国 API の URL と構造 🇨🇳

### チャンピオン情報

- URL: `https://game.gtimg.cn/images/lgamem/act/lrlib/js/heroList/hero_list.js`

```ts
// チャンピオンの基本情報
type Hero = {
  heroId: string; // チャンピオンID
  name: string; // 名前
  title: string; // タイトル
  roles: string[]; // ロール
  lane: string; // レーン
  intro: string; // 説明
  avatar: string; // アバター画像
  card: string; // カード画像
  poster: string; // ポスター画像
  highlightprice: string; // ハイライト価格
  couponprice: string; // クーポン価格
  alias: string; // 別名
  tags: string; // タグ
  searchkey: string; // 検索キー
  isWeekFree: string; // 今週の無料チャンピオン
  difficultyL: string; // 難易度
  damage: string; // ダメージ
  surviveL: string; // 生存能力
  assistL: string; // アシスト
};

type HeroList = {
  [key: string]: Hero;
};

type HeroData = {
  heroList: HeroList;
};
```

### 勝率情報（このリポジトリでは未使用）

- URL: `https://mlol.qt.qq.com/go/lgame_battle_info/hero_rank_list_v2`

```ts
interface HeroStats {
  id: number;
  position: string;
  hero_id: string;
  strength: string;
  weight: string;
  appear_rate: string;
  appear_bzc: string;
  forbid_rate: string;
  forbid_bzc: string;
  win_rate: string;
  win_bzc: string;
  dtstatdate: string;
  strength_level: string;
  appear_rate_float: string;
  forbid_rate_float: string;
  win_rate_float: string;
  appear_rate_percent: string;
  forbid_rate_percent: string;
  win_rate_percent: string;
}

interface PositionStats {
  [key: string]: HeroStats[];
}

interface Data {
  [key: string]: PositionStats;
}

interface JsonStructure {
  result: number;
  data: Data;
}
```

## 日本語チャンピオンデータの URL と構造 🇯🇵

- URL: `https://ry2x.github.io/wildrift_data/champions.json`

```ts
interface Champion {
  id: string;
  key: number;
  name: string;
  title: string;
  describe: string;
  is_fighter: boolean;
  is_mage: boolean;
  is_assassin: boolean;
  is_marksman: boolean;
  is_support: boolean;
  is_tank: boolean;
  type: string;
  is_wr: boolean;
  is_mid: boolean;
  is_top: boolean;
  is_jg: boolean;
  is_sup: boolean;
  is_ad: boolean;
}

interface Champions {
  [key: string]: Champion;
}
```
