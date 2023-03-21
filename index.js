import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';
import getDiff from './src/getDiff.js';
import getParser from './src/parser.js';
import getRenderFormat from './src/formatters/index.js';

const getData = (filepath) => readFileSync(resolve(cwd(), (filepath)), 'utf-8');
const getFormat = (filepath) => filepath.split('.')[1];

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = getParser(getData(filepath1), getFormat(filepath1));
  const file2 = getParser(getData(filepath2), getFormat(filepath2));

  return getRenderFormat(getDiff(file1, file2), format);
};
export default genDiff;
