# WildRift Champion Data

> このリポジトリにはWildRiftチャンピオンに関する静的情報はありません。

チャンピオンデータは[gh-pages](https://github.com/ry2x/WildRift-Champs/tree/gh-pages)ブランチで確認できます。

データはCN APIと収集した[チャンピオンデータ](https://github.com/ry2x/wildrift_data)から作成されています。

データに誤りが含まれている場合は、[issue](https://github.com/ry2x/WildRift-Champs/issues)を立てて知らせてください！

（[このリポジトリ](https://github.com/ry2x/wildrift_data)のJSONファイルを修正する必要がある場合もあります。プルリクエストは大歓迎です！）

毎晩UTC 00:00時に新しいデータが公開されます。

---

## APIとして使用する際

- エンドポイント: `https://ry2x.github.io/WildRift-Champs/`

### hero.json

`hero.json`には、WildRiftチャンピオンに関する主要情報が含まれています。

- URL: `https://ry2x.github.io/WildRift-Champs/hero.json`

- 構造:  

```ts
interface MergedChamp {
  id: string; // LOL APIでのチャンピオンID
  key: number; // LOL APIでのチャンピオンキー
  name: string; // チャンピオン名 (日本語)
  title: string; // タイトル (日本語)
  describe: string; // 説明 (日本語)
  is_fighter: boolean; // タグ: ファイター
  is_mage: boolean; // タグ: メイジ
  is_assassin: boolean; // タグ: アサシン
  is_marksman: boolean; // タグ: マークスマン
  is_support: boolean; // タグ: サポート
  is_tank: boolean; // タグ: タンク
  type: string; // マナタイプ (日本語)
  is_wr: boolean; // WildRiftで利用可能かどうか
  is_mid: boolean;
  is_top: boolean;
  is_jg: boolean;
  is_sup: boolean;
  is_ad: boolean;
  is_free: boolean; // 週ごとの無料チャンピオンかどうか
  difficult: number; // 使用の難易度
  damage: number; // ダメージの大きさ
  survive: number; // 生存力
  utility: number;
  hero_id: number; // LOLM APIでのチャンピオンID
}
```

---

## CN APIのURLと構造

- チャンピオン: `https://game.gtimg.cn/images/lgamem/act/lrlib/js/heroList/hero_list.js`  
  - 構造:

```ts
// チャンピオンの主要情報
type Hero = {
  heroId: string;
  name: string;
  title: string;
  roles: string[];
  lane: string;
  intro: string;
  avatar: string;
  card: string;
  poster: string;
  highlightprice: string;
  couponprice: string;
  alias: string;
  tags: string;
  searchkey: string;
  isWeekFree: string;
  difficultyL: string;
  damage: string;
  surviveL: string;
  assistL: string;
};

type HeroList = {
  [key: string]: Hero;
};

// API構造
type HeroData = {
  heroList: HeroList;
};
```

---

## 収集したチャンピオンデータ（日本語）のURLと構造

- URL: `https://ry2x.github.io/wildrift_data/champions.json`  
  - 構造:  

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
