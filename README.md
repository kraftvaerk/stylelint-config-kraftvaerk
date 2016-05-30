# stylelint-config-kraftvaerk 
Stylelint shareable config for the Kraftvaerk stylesheet style guide

[![GitHub release](https://img.shields.io/github/release/kraftvaerk/stylelint-config-kraftvaerk.svg?style=flat-square)]() [![Build Status](https://img.shields.io/travis/kraftvaerk/stylelint-config-kraftvaerk/master.svg?style=flat-square)](https://travis-ci.org/kraftvaerk/stylelint-config-kraftvaerk) [![David](https://img.shields.io/david/dev/kraftvaerk/stylelint-config-kraftvaerk.svg?style=flat-square)]()

[![npm](https://nodei.co/npm/stylelint-config-kraftvaerk.svg?downloads=true)](https://nodei.co/npm/stylelint-config-kraftvaerk/)


# Rules for your CSS

Code should always be written in such a way that makes it look like a single person wrote it, no matter how many people have contributed and that is the purpose of this set of rules powered by [stylelint](https://github.com/stylelint/stylelint).

## Installation

You need to have `stylelint` and this config as part of your `devDependencies`.

```
$ npm install --save-dev stylelint stylelint-config-kraftvaerk
```

## Usage

### Load everything

To use all the rules all at once add `stylelint-config-kraftvaerk` to your `extends` property in `.stylelintrc`.

```json
{
  "extends": [
    "stylelint-config-kraftvaerk"
  ]
}
```

### Load a specific rule

Each rule for `stylelint-config-kraftvaerk` can be loaded individually if you only want to load a specific rule. They are all located in the `lib` folder.

Load the `color` and `general` rule set.

```json
{
  "extends": [
    "stylelint-config-kraftvaerk/lib/color",
    "stylelint-config-kraftvaerk/lib/general"
  ]
}
```


### Override specific rules

To override the rules set by `stylelint-config-kraftvaerk` you need to define your own rules and set them as you see fit.

```json
{
  "extends": [
    "stylelint-config-kraftvaerk"
  ],
  "rules": {
    "indentation": 2
  }
}
```
