#!/usr/bin/env node
import getDiff from '../src/getDiff.js';
import { Command } from 'commander';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --vers', 'output the current version')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(getDiff(filepath1, filepath2));
  })
  .option('-f, --format <type>', 'output format');
program.parse();