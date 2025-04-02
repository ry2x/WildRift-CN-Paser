import axios, { AxiosResponse } from 'axios';
import {
  Champions,
  Config,
  HeroData,
  MergedChamp,
  LaneInfo,
  Hero,
} from './types.js';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

// 定数の定義
const CONFIG_PATH = 'config.json';

// エラーメッセージの定義
const ERROR_MESSAGES = {
  CONFIG_READ: '設定ファイルの読み込みに失敗しました',
  FOLDER_CREATE: '出力フォルダの作成に失敗しました',
  DATA_FETCH: 'データの取得に失敗しました',
  JSON_WRITE: 'JSONファイルの書き込みに失敗しました',
} as const;

// 設定の読み込み
const loadConfig = (): Config => {
  try {
    const configPath = join(process.cwd(), CONFIG_PATH);
    return JSON.parse(readFileSync(configPath, 'utf8')) as Config;
  } catch (error) {
    console.error(ERROR_MESSAGES.CONFIG_READ, error);
    throw error;
  }
};

const config = loadConfig();

// ポスターURLからチャンピオン名を抽出
const extractChampionNameFromPoster = (posterUrl: string): string | null => {
  const match = posterUrl.match(/\/([A-Za-z]+)_\d+\.jpg$/);
  return match ? match[1] : null;
};

// レーン情報のパース
const parseLaneInfo = (lane: string): LaneInfo => {
  const lanes = lane.split(';');
  return {
    is_mid: lanes.includes('中路'),
    is_jg: lanes.includes('打野'),
    is_top: lanes.includes('单人路'),
    is_sup: lanes.includes('辅助'),
    is_ad: lanes.includes('射手'),
  };
};

// データの取得
const fetchData = async <T>(url: string): Promise<AxiosResponse<T>> => {
  try {
    return await axios.get<T>(url);
  } catch (error) {
    console.error(ERROR_MESSAGES.DATA_FETCH, error);
    throw error;
  }
};

// チャンピオンデータのマージ
const mergeChampionData = (
  hero: Champions[keyof Champions],
  cnHero: Hero | undefined
): MergedChamp => {
  const laneInfo = cnHero
    ? parseLaneInfo(cnHero.lane)
    : {
        is_mid: hero.is_mid,
        is_top: hero.is_top,
        is_jg: hero.is_jg,
        is_sup: hero.is_sup,
        is_ad: hero.is_ad,
      };

  return {
    ...hero,
    is_free: cnHero?.isWeekFree === '1',
    difficult: cnHero ? Number(cnHero.difficultyL) : 0,
    damage: cnHero ? Number(cnHero.damage) : 0,
    survive: cnHero ? Number(cnHero.surviveL) : 0,
    utility: cnHero ? Number(cnHero.assistL) : 0,
    hero_id: cnHero ? Number(cnHero.heroId) : 0,
    ...laneInfo,
  };
};

// データのエクスポート
const exportData = async (): Promise<MergedChamp[]> => {
  try {
    const [cnData, jpData] = await Promise.all([
      fetchData<HeroData>(config.urlCN),
      fetchData<Champions>(config.urlChamp),
    ]);

    return Object.values(jpData.data).map((hero) => {
      const cnHero = Object.values(cnData.data.heroList).find(
        (h) => extractChampionNameFromPoster(h.poster) === hero.id
      );
      return mergeChampionData(hero, cnHero);
    });
  } catch (error) {
    console.error('データのエクスポートに失敗しました', error);
    throw error;
  }
};

// 出力ディレクトリの作成
const createOutputDirectory = async (): Promise<void> => {
  try {
    mkdirSync(config.folderName, { recursive: true });
    console.log('出力フォルダを作成しました✨');
  } catch (error) {
    console.error(ERROR_MESSAGES.FOLDER_CREATE, error);
    throw error;
  }
};

// JSONファイルの出力
const writeJsonFile = async (data: MergedChamp[]): Promise<void> => {
  try {
    const outputPath = join(config.folderName, 'hero.json');
    writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('JSONファイルの出力に成功しました✨');
  } catch (error) {
    console.error(ERROR_MESSAGES.JSON_WRITE, error);
    throw error;
  }
};

// メイン処理
const main = async (): Promise<void> => {
  try {
    await createOutputDirectory();
    const data = await exportData();
    await writeJsonFile(data);
    console.log('すべての処理が完了しました！🎉');
  } catch (error) {
    console.error('処理中にエラーが発生しました💦', error);
    process.exit(1);
  }
};

main();
