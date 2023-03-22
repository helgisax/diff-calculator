### Hexlet tests and linter status:
[![Actions Status](https://github.com/helgisax/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/helgisax/frontend-project-46/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/ab9dad7572011598a674/maintainability)](https://codeclimate.com/github/helgisax/frontend-project-46/maintainability) [![main](https://github.com/helgisax/frontend-project-46/actions/workflows/main.yml/badge.svg)](https://github.com/helgisax/frontend-project-46/actions/workflows/main.yml) [![Test Coverage](https://api.codeclimate.com/v1/badges/ab9dad7572011598a674/test_coverage)](https://codeclimate.com/github/helgisax/frontend-project-46/test_coverage) [![linter status](https://github.com/helgisax/frontend-project-46/actions/workflows/linter.yml/badge.svg)](https://github.com/helgisax/frontend-project-46/actions/workflows/linter.yml)

## Requires git and Node.js installed

## Description:
A difference calculator is a program that determines the difference between two data structures. Utility features:
 - Support for different input formats: ```yaml```, ```json```
 - Report generation in the form of ```plain text```, ```stylish``` and ```json```

## Start:

 - Clone this repository with 'git clone git@github.com:helgisax/frontend-project-46.git' command;
 - Go to the directory 'frontend-project-46' with command 'cd frontend-project-46';
 - Use 'make install' command;
 - And use 'npm link' command.


### Usage example:
```bash
# plain format
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# stylish format
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}

```

### Demonstration:
<a href="https://asciinema.org/a/3uXNaGW7iLmdrPL7swdIO6Piv" target="_blank"><img src="https://asciinema.org/a/Iv08mlLDbBzc32Y9410yE8SYp.svg" width="300"/></a>