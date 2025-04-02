# WildRift Champion Data 🎮

> 日本語版は[こちら](https://github.com/ry2x/WildRift-Champs/blob/master/readme.md)からご覧いただけます。

## Overview 📝

This repository manages champion data for WildRift!
The data is created from the Chinese API and [champion data](https://github.com/ry2x/wildrift_data).

New data is published every day at UTC 00:00!

## How to View Data 🔍

You can check the champion data in the [gh-pages](https://github.com/ry2x/WildRift-Champs/tree/gh-pages) branch.

## Bug Reports 🐛

If you find any errors in the data, please create an [issue](https://github.com/ry2x/WildRift-Champs/issues) to let us know!
(You might also need to correct the JSON file in [this repository](https://github.com/ry2x/wildrift_data). Pull requests are always welcome!)

## Using as an API 🚀

Endpoint: `https://ry2x.github.io/WildRift-Champs/`

### hero.json

This JSON file contains basic information about champions.

- URL: `https://ry2x.github.io/WildRift-Champs/hero.json`

- Data Structure:

```ts
interface MergedChamp {
  id: string; // Champion ID on LOL API
  key: number; // Champion key on LOL API
  name: string; // Champion name (Japanese)
  title: string; // Title (Japanese)
  describe: string; // Description (Japanese)
  is_fighter: boolean; // Fighter tag
  is_mage: boolean; // Mage tag
  is_assassin: boolean; // Assassin tag
  is_marksman: boolean; // Marksman tag
  is_support: boolean; // Support tag
  is_tank: boolean; // Tank tag
  type: string; // Mana type (Japanese)
  is_wr: boolean; // Available in WildRift?
  is_mid: boolean; // Mid lane
  is_top: boolean; // Top lane
  is_jg: boolean; // Jungle
  is_sup: boolean; // Support
  is_ad: boolean; // AD
  is_free: boolean; // Free champion of the week
  difficult: number; // Difficulty
  damage: number; // Damage amount
  survive: number; // Survivability
  utility: number; // Utility
  hero_id: number; // Champion ID on LOLM API
}
```

## Chinese API URL and Structure 🇨🇳

### Champion Information

- URL: `https://game.gtimg.cn/images/lgamem/act/lrlib/js/heroList/hero_list.js`

```ts
// Basic champion information
type Hero = {
  heroId: string; // Champion ID
  name: string; // Name
  title: string; // Title
  roles: string[]; // Roles
  lane: string; // Lane
  intro: string; // Description
  avatar: string; // Avatar image
  card: string; // Card image
  poster: string; // Poster image
  highlightprice: string; // Highlight price
  couponprice: string; // Coupon price
  alias: string; // Alias
  tags: string; // Tags
  searchkey: string; // Search key
  isWeekFree: string; // Free champion of the week
  difficultyL: string; // Difficulty
  damage: string; // Damage
  surviveL: string; // Survivability
  assistL: string; // Assist
};

type HeroList = {
  [key: string]: Hero;
};

type HeroData = {
  heroList: HeroList;
};
```

### Win Rate Information (Not used in this repository)

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

## Japanese Champion Data URL and Structure 🇯🇵

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
