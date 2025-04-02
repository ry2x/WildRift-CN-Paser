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

// 設定の読み込み
function loadConfig(): Config {
  try {
    const configPath = join(process.cwd(), 'config.json');
    return JSON.parse(readFileSync(configPath, 'utf8')) as Config;
  } catch (error) {
    console.error('設定ファイルの読み込みに失敗しました', error);
    throw error;
  }
}

const config = loadConfig();

// ポスターURLからチャンピオン名を抽出
function extractChampionNameFromPoster(posterUrl: string): string | null {
  const match = posterUrl.match(/\/([A-Za-z]+)_\d+\.jpg$/);
  return match ? match[1] : null;
}

// レーン情報のパース
function parseLaneInfo(lane: string): LaneInfo {
  const lanes = lane.split(';');
  return {
    is_mid: lanes.includes(config.laneInfo.mid),
    is_jg: lanes.includes(config.laneInfo.jg),
    is_top: lanes.includes(config.laneInfo.top),
    is_sup: lanes.includes(config.laneInfo.sup),
    is_ad: lanes.includes(config.laneInfo.ad),
  };
}

// データの取得
async function fetchData<T>(url: string): Promise<AxiosResponse<T>> {
  try {
    return await axios.get<T>(url);
  } catch (error) {
    console.error(config.errorMessages.DATA_FETCH, error);
    throw error;
  }
}

// チャンピオンデータのマージ
function mergeChampionData(
  hero: Champions[keyof Champions],
  cnHero: Hero | undefined
): MergedChamp {
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
}

// データのエクスポート
async function exportData(): Promise<MergedChamp[]> {
  try {
    const [cnData, jpData] = await Promise.all([
      fetchData<HeroData>(config.urlCN),
      fetchData<Champions>(config.urlChamp),
    ]);

    return Object.values(jpData.data).map(function (hero) {
      const cnHero = Object.values(cnData.data.heroList).find(function (h) {
        return extractChampionNameFromPoster(h.poster) === hero.id;
      });
      return mergeChampionData(hero, cnHero);
    });
  } catch (error) {
    console.error(config.errorMessages.DATA_EXPORT, error);
    throw error;
  }
}

// 出力ディレクトリの作成
async function createOutputDirectory(): Promise<void> {
  try {
    mkdirSync(config.folderName, { recursive: true });
    console.log(config.successMessages.FOLDER_CREATE);
  } catch (error) {
    console.error(config.errorMessages.FOLDER_CREATE, error);
    throw error;
  }
}

// JSONファイルの出力
async function writeJsonFile(data: MergedChamp[]): Promise<void> {
  try {
    const outputPath = join(config.folderName, config.outputFileName);
    writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(config.successMessages.JSON_WRITE);
  } catch (error) {
    console.error(config.errorMessages.JSON_WRITE, error);
    throw error;
  }
}

// メイン処理
async function main(): Promise<void> {
  try {
    await createOutputDirectory();
    const data = await exportData();
    await writeJsonFile(data);
    console.log(config.successMessages.PROCESS_COMPLETE);
  } catch (error) {
    console.error(config.errorMessages.PROCESS_ERROR, error);
    process.exit(1);
  }
}

main();
