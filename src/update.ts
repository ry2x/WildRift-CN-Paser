import axios, { AxiosResponse } from 'axios';
import { Champions, Config, HeroData, MergedChamp, Champion } from './types.js';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const __dirname = process.cwd();
const config = JSON.parse(
  readFileSync(join(__dirname, 'config.json'), 'utf8')
) as Config;

const extractChampionNameFromPoster = (posterUrl: string): string | null => {
  const match = posterUrl.match(/\/([A-Za-z]+)_\d+\.jpg$/);
  return match ? match[1] : null;
};

const parseLaneInfo = (lane: string) => {
  const lanes = lane.split(';');
  return {
    is_mid: lanes.includes('中路'),
    is_jg: lanes.includes('打野'),
    is_top: lanes.includes('单人路'),
    is_sup: lanes.includes('辅助'),
    is_ad: lanes.includes('双人路'),
  };
};

async function fetchData<T>(url: string): Promise<AxiosResponse<T>> {
  try {
    return await axios.get(url);
  } catch (err) {
    console.error('Failed to fetch cn api', err);
    throw err;
  }
}

async function exportData(): Promise<MergedChamp[]> {
  const cnData = await fetchData<HeroData>(config.urlCN);
  const jpData = await fetchData<Champions>(config.urlChamp);
  const mergedHeroes: MergedChamp[] = [];

  for (const heroId in cnData.data.heroList) {
    const cnHero = cnData.data.heroList[heroId];

    const extractedName = extractChampionNameFromPoster(cnHero.poster);
    if (!extractedName) continue;

    const hero = Object.values(jpData.data).find(
      (h: Champion) => h.id === extractedName
    );

    if (hero) {
      const laneInfo = parseLaneInfo(cnHero.lane);
      const mergedChampion: MergedChamp = {
        id: hero.id,
        key: hero.key,
        name: hero.name,
        title: hero.title,
        describe: hero.describe,
        is_fighter: hero.is_fighter,
        is_mage: hero.is_mage,
        is_assassin: hero.is_assassin,
        is_marksman: hero.is_marksman,
        is_support: hero.is_support,
        is_tank: hero.is_tank,
        type: hero.type,
        is_wr: hero.is_wr,
        is_mid: laneInfo.is_mid,
        is_top: laneInfo.is_top,
        is_jg: laneInfo.is_jg,
        is_sup: laneInfo.is_sup,
        is_ad: laneInfo.is_ad,
        is_free: cnHero.isWeekFree === '1',
        difficult: Number(cnHero.difficultyL),
        damage: Number(cnHero.damage),
        survive: Number(cnHero.surviveL),
        utility: Number(cnHero.assistL),
        hero_id: Number(cnHero.heroId),
      };
      mergedHeroes.push(mergedChampion);
    }
  }
  return mergedHeroes;
}

async function createOutDir() {
  try {
    mkdirSync(config.folderName, { recursive: true });
    console.log('Created Folder to out put');
  } catch (err) {
    console.error('Failed to create folder', err);
  }
}

async function outPutJson(data: MergedChamp[]) {
  try {
    writeFileSync('public/hero.json', JSON.stringify(data), 'utf-8');
    console.log('Successfully out putting');
  } catch (err) {
    console.error('Failed to out put JSON', err);
  }
}

async function main() {
  await createOutDir();
  const data = await exportData();
  await outPutJson(data);

  console.log('Successfully creating JSON');
}

main();
