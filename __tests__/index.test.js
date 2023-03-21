import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishResult = readFile('stylish.expect.txt');
const plainResult = readFile('plain.expect.txt');
// const jsonResult = readFile('json.expect.txt');

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');
const file1Yml = getFixturePath('file1.yml');
const file2Yml = getFixturePath('file2.yml');

test.each([
  [file1Json, file2Json, stylishResult],
  [file1Yml, file2Yml, stylishResult],
  [file1Json, file2Yml, stylishResult],
])('Stylish', (file1, file2, expected) => {
  expect(genDiff(file1, file2, 'stylish')).toBe(expected);
});

test.each([
  [file1Json, file2Json, plainResult],
  [file1Yml, file2Yml, plainResult],
  [file1Json, file2Yml, plainResult],
])('Plain', (file1, file2, expected) => {
  expect(genDiff(file1, file2, 'plain')).toBe(expected);
});

// test.each([
//   [file1Json, file2Json, jsonResult],
//   [file1Yml, file2Yml, jsonResult],
//   [file1Json, file2Yml, jsonResult],
// ])('Plain', (file1, file2, expected) => {
//   expect(genDiff(file1, file2, 'json')).toBe(expected);
// });
