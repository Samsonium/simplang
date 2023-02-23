import Lexer from "./lexer/Lexer";
import Parser from "./parser/Parser";
import { readFileSync, accessSync } from "fs";
import { resolve } from "path";

let simplangArg = 1;
for (let i = 0; i < process.argv.length; i++) if (process.argv[i].includes('simplang.js')) {
    simplangArg = i;
    break;
}

const filepath = process.argv[simplangArg + 1];
if (!filepath) {
    console.log('Ошибка! Укажите путь к файлу');
    process.exit(0);
}

try { accessSync(resolve(filepath)) }
catch (_) {
    console.log(`Файл не найден или к нему нет доступа (${filepath})`);
    process.exit(0);
}

let code: string;
try { code = readFileSync(resolve(filepath)).toString('utf-8'); }
catch (_) {
    console.log(`Произошла ошибка при чтении файла`);
    process.exit(0);
}

const lexer = new Lexer(code);
const tokens = lexer.analyze();

const parser = new Parser(tokens);
const root = parser.parse();
parser.execute(root);
