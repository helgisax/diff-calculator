import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';
import getDiff from './src/getDiff.js';
import getParser from './src/parser.js';

const buildTree = (nodes) => {
  const tree = nodes.map((node) => {
    const { key, value, oldValue } = node;
    switch (node.type) {
      case 'added': return `  + ${key}: ${value}`;
      case 'removed': return `  - ${key}: ${value}`;
      case 'unchanged': return `    ${key}: ${value}`;
      case 'updated': return `  - ${key}: ${oldValue}\n  + ${key}: ${value}`;
      default: throw new Error(`Unknown value, mate!: '${node}'`);
    }
  });
  return `{\n${tree.join('\n')} \n}`;
};

const getData = (filepath) => readFileSync(resolve(cwd(), (filepath)), 'utf-8');
const getFormat = (filepath) => filepath.split('.')[1];

const genDiff = (filepath1, filepath2) => {
  const file1 = getParser(getData(filepath1), getFormat(filepath1));
  const file2 = getParser(getData(filepath2), getFormat(filepath2));

  return buildTree(getDiff(file1, file2));
};
export default genDiff;
