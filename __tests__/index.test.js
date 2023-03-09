import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const genDiffResult = readFile('genDiff.expect.txt');
const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');

test('genDiff json', () => {
  expect(genDiff(file1, file2)).toBe(genDiffResult);
});
