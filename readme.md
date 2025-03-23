# WildRift Champion Data

> 日本語のREADMEは[ここ](https://github.com/ry2x/WildRift-Champs/blob/master/readme.jp.md)から確認できます。

> This repository has no static information about WildRift Champs

You can check champion data in [gh-pages](https://github.com/ry2x/WildRift-Champs/tree/gh-pages) branch.

The data is created from CN api and my [champion data](https://github.com/ry2x/wildrift_data).

If you notice any errors in the data, please raise an [issue](https://github.com/ry2x/WildRift-Champs/issues) to inform us!

(You might also need to correct the JSON file in [a repository](https://github.com/ry2x/wildrift_data). Pull requests are always welcome!)

On every night at 00:00 UTC, new data will be published.

## Use as API

- End point: `https://ry2x.github.io/WildRift-Champs/`

### hero.json

`hero.json` has main information about champions in wildrift.

- URL : `https://ry2x.github.io/WildRift-Champs/hero.json`

- Structure :

```ts
interface MergedChamp {
  id: string; // champion id on LOL api
  key: number; // champion key on LOL api
  name: string; // champion name (jp)
  title: string; // (jp)
  describe: string; // (jp)
  is_fighter: boolean; // tag-fighter
  is_mage: boolean; // tag-mage
  is_assassin: boolean; // tag-assassin
  is_marksman: boolean; // tag-marksman
  is_support: boolean; // tag-support
  is_tank: boolean; // tag-tank
  type: string; // mana type (jp)
  is_wr: boolean; // available in wildrift?
  is_mid: boolean;
  is_top: boolean;
  is_jg: boolean;
  is_sup: boolean;
  is_ad: boolean;
  is_free: boolean; // free champion for week
  difficult: number; // difficulty to use
  damage: number; // extent of the damage
  survive: number; // survivability
  utility: number;
  hero_id: number; // champion id on lolm api
}
```

## URL and structure of CN API

- Champions: `https://game.gtimg.cn/images/lgamem/act/lrlib/js/heroList/hero_list.js`
   - Structure:

```ts
// main information of champion
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

// api structure
type HeroData = {
  heroList: HeroList;
};
```

- Winrate(❌not used in this repo): `https://mlol.qt.qq.com/go/lgame_battle_info/hero_rank_list_v2`
  - Structure:

```ts
// main information of winrate 
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

// each lane
interface PositionStats {
  [key: string]: HeroStats[];
}

interface Data {
  [key: string]: PositionStats;
}

// api structure
interface JsonStructure {
  result: number;
  data: Data;
}
```

## URL and structure of my champion data (JP)

- URL: `https://ry2x.github.io/wildrift_data/champions.json`
  - Structure:

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
