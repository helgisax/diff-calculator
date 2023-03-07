#!/usr/bin/env node

import { fs } from 'fs';
import path from 'path';
import genDiff from '../index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonResult = readFile('genDiff.expect.txt');
const file1 = readFile('file1.json');
const file2 = readFile('file2.json');

test('genDiff', () => {
  expect(genDiff(file1, file2)).toBe(jsonResult);
});
