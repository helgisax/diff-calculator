import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';
import getDiff from './src/getDiff.js';

const buildTree = (nodes) => {
    const tree = nodes.map((node) => {
      const {key, value, oldValue} = node;
      switch(node.type) {
        case 'added': return `  + ${key}: ${value}`
        case 'removed': return `  - ${key}: ${value}`
        case 'unchanged': return `    ${key}: ${value}`
        case 'updated': return `  - ${key}: ${oldValue}\n  + ${key}: ${value}`
        default: console.log('oops');
    }
    })
    return `{\n${tree.join('\n')} \n}`;
};

const genDiff = (filepath1, filepath2) => {
    const file1 = readFileSync(resolve(cwd(), (filepath1)), 'utf-8');
    const file2 = readFileSync(resolve(cwd(), (filepath2)), 'utf-8');

    const obj1 = JSON.parse(file1);
    const obj2 = JSON.parse(file2);

    return buildTree(getDiff(obj1, obj2));
};
export default genDiff;