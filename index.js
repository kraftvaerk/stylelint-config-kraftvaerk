const blockRules        = require('./lib/block');
const colorRules        = require('./lib/color');
const commentRules      = require('./lib/comment');
const customRules       = require('./lib/custom');
const declarationRules  = require('./lib/declaration');
const fontRules         = require('./lib/font');
const functionRules     = require('./lib/function');
const generalRules      = require('./lib/general');
const mediaRules        = require('./lib/media');
const numberRules       = require('./lib/number');
const propertyRules     = require('./lib/property');
const ruleRules         = require('./lib/rule');
const selectorRules     = require('./lib/selector');
const stringRules       = require('./lib/string');
const unitRules         = require('./lib/unit');
const valueRules        = require('./lib/value');

const rules = {
    rules: Object.assign(
        {},
        blockRules.rules,
        colorRules.rules,
        commentRules.rules,
        customRules.rules,
        declarationRules.rules,
        fontRules.rules,
        functionRules.rules,
        generalRules.rules,
        mediaRules.rules,
        numberRules.rules,
        propertyRules.rules,
        ruleRules.rules,
        selectorRules.rules,
        stringRules.rules,
        unitRules.rules,
        valueRules.rules
    )
};

module.exports = rules;
