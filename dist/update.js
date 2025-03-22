"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const path_1 = require("path");
const __dirname = process.cwd();
const config = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'config.json'), 'utf8'));
const extractChampionNameFromPoster = (posterUrl) => {
    const match = posterUrl.match(/\/([A-Za-z]+)_\d+\.jpg$/);
    return match ? match[1] : null;
};
async function fetchData(url) {
    try {
        return await axios_1.default.get(url);
    }
    catch (err) {
        console.error('Failed to fetch cn api', err);
        throw err;
    }
}
async function exportData() {
    const cnData = await fetchData(config.urlCN);
    const jpData = await fetchData(config.urlChamp);
    const mergedHeroes = [];
    for (const heroId in cnData.data.heroList) {
        const cnHero = cnData.data.heroList[heroId];
        const extractedName = extractChampionNameFromPoster(cnHero.poster);
        if (!extractedName)
            continue;
        const hero = Object.values(jpData.data).find((h) => h.id === extractedName);
        if (hero) {
            const mergedChampion = {
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
                is_mid: hero.is_mid,
                is_top: hero.is_top,
                is_jg: hero.is_jg,
                is_sup: hero.is_sup,
                is_ad: hero.is_ad,
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
        (0, fs_1.mkdirSync)(config.folderName, { recursive: true });
        console.log('Created Folder to out put');
    }
    catch (err) {
        console.error('Failed to create folder', err);
    }
}
async function outPutJson(data) {
    try {
        (0, fs_1.writeFileSync)('public/hero.json', JSON.stringify(data, null, 2), 'utf-8');
        console.log('Successfully out putting');
    }
    catch (err) {
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
