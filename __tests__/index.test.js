import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishResult = readFile('stylish.expect.txt');
const plainResult = readFile('plain.expect.txt');

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');
const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');

test.each([
  [file1Json, file2Json, stylishResult],
  [file1Yml, file2Yml, stylishResult],
  [file1Json, file2Yml, stylishResult],
])('Stylish', (file1, file2, expected) => {
  const result1 = genDiff(file1, file2, 'stylish');
  expect(result1).toBe(expected);

  const result2 = genDiff(file1, file2, 'plain');
  expect(result2).not.toBe(expected);

  const data = genDiff(file1, file2, 'json');
  expect(() => JSON.parse(data)).not.toThrow();
});

test.each([
  [file1Json, file2Json, plainResult],
  [file1Yml, file2Yml, plainResult],
  [file1Json, file2Yml, plainResult],
])('Plain', (file1, file2, expected) => {
  const result1 = genDiff(file1, file2, 'plain');
  expect(result1).toBe(expected);

  const result2 = genDiff(file1, file2, 'stylish');
  expect(result2).not.toBe(expected);

  const data = genDiff(file1, file2, 'json');
  expect(() => JSON.parse(data)).not.toThrow();
});
