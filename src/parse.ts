import fs from 'fs';
import { HeroData } from './types';

const jsonFilePath = 'hero_cn.json';
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
const heroData: HeroData = JSON.parse(jsonData);

const outputFilePath = 'translated_heroes.json';
fs.writeFileSync(outputFilePath, JSON.stringify(heroData, null, 4), 'utf-8');

console.log(`Translation completed! Saved to ${outputFilePath}`);
