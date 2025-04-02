import axios from 'axios';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
function loadConfig() {
    try {
        const configPath = join(process.cwd(), 'config.json');
        return JSON.parse(readFileSync(configPath, 'utf8'));
    }
    catch (error) {
        console.error('設定ファイルの読み込みに失敗しました', error);
        throw error;
    }
}
const config = loadConfig();
function extractChampionNameFromPoster(posterUrl) {
    const match = posterUrl.match(/\/([A-Za-z]+)_\d+\.jpg$/);
    return match ? match[1] : null;
}
function parseLaneInfo(lane) {
    const lanes = lane.split(';');
    return {
        is_mid: lanes.includes(config.laneInfo.mid),
        is_jg: lanes.includes(config.laneInfo.jg),
        is_top: lanes.includes(config.laneInfo.top),
        is_sup: lanes.includes(config.laneInfo.sup),
        is_ad: lanes.includes(config.laneInfo.ad),
    };
}
async function fetchData(url) {
    try {
        return await axios.get(url);
    }
    catch (error) {
        console.error(config.errorMessages.DATA_FETCH, error);
        throw error;
    }
}
function mergeChampionData(hero, cnHero) {
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
async function exportData() {
    try {
        const [cnData, jpData] = await Promise.all([
            fetchData(config.urlCN),
            fetchData(config.urlChamp),
        ]);
        return Object.values(jpData.data).map(function (hero) {
            const cnHero = Object.values(cnData.data.heroList).find(function (h) {
                return extractChampionNameFromPoster(h.poster) === hero.id;
            });
            return mergeChampionData(hero, cnHero);
        });
    }
    catch (error) {
        console.error(config.errorMessages.DATA_EXPORT, error);
        throw error;
    }
}
async function createOutputDirectory() {
    try {
        mkdirSync(config.folderName, { recursive: true });
        console.log(config.successMessages.FOLDER_CREATE);
    }
    catch (error) {
        console.error(config.errorMessages.FOLDER_CREATE, error);
        throw error;
    }
}
async function writeJsonFile(data) {
    try {
        const outputPath = join(config.folderName, config.outputFileName);
        writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(config.successMessages.JSON_WRITE);
    }
    catch (error) {
        console.error(config.errorMessages.JSON_WRITE, error);
        throw error;
    }
}
async function main() {
    try {
        await createOutputDirectory();
        const data = await exportData();
        await writeJsonFile(data);
        console.log(config.successMessages.PROCESS_COMPLETE);
    }
    catch (error) {
        console.error(config.errorMessages.PROCESS_ERROR, error);
        process.exit(1);
    }
}
main();
