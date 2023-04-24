import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');
const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');

test.each([
  [file1Json, file2Json],
  [file1Yml, file2Yml],
  [file1Json, file2Yml],
])('should return correct result in various formats', (file1, file2) => {
  const stylishResult = readFile('stylish.expect.txt');
  const plainResult = readFile('plain.expect.txt');

  const result1 = genDiff(file1, file2, 'stylish');
  expect(result1).toBe(stylishResult);

  const result2 = genDiff(file1, file2, 'plain');
  expect(result2).toBe(plainResult);

  const result3 = genDiff(file1, file2, 'json');
  expect(() => JSON.parse(result3)).not.toThrow();

  const result4 = genDiff(file1, file2);
  expect(result4).toBe(stylishResult);
});
