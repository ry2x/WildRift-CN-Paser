import fs from 'fs';
import { Champion, Champions, HeroData, MergedChamp } from './types';

// JSONファイルを読み込む関数
const loadJson = (filePath: string) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// `poster` URL からチャンピオン名を抽出する関数
const extractChampionNameFromPoster = (posterUrl: string): string | null => {
  const match = posterUrl.match(/\/([A-Za-z]+)_\d+\.jpg$/);
  return match ? match[1] : null;
};

// データ読み込み
const heroData: Champions = loadJson('hero.json');
const translatedData: HeroData = loadJson('translated_heroes.json');

// マージ処理
const mergedHeroes: MergedChamp[] = [];

for (const heroId in translatedData.heroList) {
  const translatedHero = translatedData.heroList[heroId];

  // poster URL からチャンピオン名を抽出
  const extractedName = extractChampionNameFromPoster(translatedHero.poster);
  if (!extractedName) continue; // 取得できない場合はスキップ

  // hero.json から `id` が `extractedName` に一致するデータを探す
  const hero = Object.values(heroData).find(
    (h: Champion) => h.id === extractedName
  );

  if (hero) {
    // hero.json と translated_heroes.json のデータを統合
    const mergedChampion: MergedChamp = {
      id: hero.id,
      key: hero.key,
      name: hero.name, // 英語名に置き換え
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
      is_mid: hero.is_mid,
      is_top: hero.is_top,
      is_jg: hero.is_jg,
      is_sup: hero.is_sup,
      is_ad: hero.is_ad,
      is_free: translatedHero.isWeekFree === '1',
      difficult: Number(translatedHero.difficultyL),
      damage: Number(translatedHero.damage),
      survive: Number(translatedHero.surviveL),
      utility: Number(translatedHero.assistL),
      hero_id: Number(translatedHero.heroId),
    };

    mergedHeroes.push(mergedChampion);
  }
}

// マージしたデータを保存
fs.writeFileSync(
  'merged_heroes.json',
  JSON.stringify(mergedHeroes, null, 2),
  'utf-8'
);

console.log('Merged heroes data saved to merged_heroes.json');
