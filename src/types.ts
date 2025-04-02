// 共通のチャンピオン基本情報
export interface BaseChampion {
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

// 中国サーバーのチャンピオン情報
export type Hero = {
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

export type HeroList = {
  [key: string]: Hero;
};

export type HeroData = {
  heroList: HeroList;
};

// 日本サーバーのチャンピオン情報
export interface Champion extends BaseChampion {}

export interface Champions {
  [key: string]: Champion;
}

// マージされたチャンピオン情報
export interface MergedChamp extends BaseChampion {
  is_free: boolean;
  difficult: number;
  damage: number;
  survive: number;
  utility: number;
  hero_id: number;
}

// 設定情報
export interface Config {
  urlCN: string;
  urlChamp: string;
  folderName: string;
}

// レーン情報
export interface LaneInfo {
  is_mid: boolean;
  is_jg: boolean;
  is_top: boolean;
  is_sup: boolean;
  is_ad: boolean;
}
