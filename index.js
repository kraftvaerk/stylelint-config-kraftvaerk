'use strict';

const propertiesOrder = require('stylelint-config-primer').rules['order/properties-order'];

module.exports = {
    extends: 'stylelint-config-standard',
    plugins: [
        'stylelint-order'
    ],
    rules: {
        'at-rule-empty-line-before': ['always', {
            except: [
                'blockless-after-same-name-blockless',
                'first-nested'
            ],
            ignore: [
                'after-comment',
                'inside-block',
                'blockless-after-same-name-blockless',
                'blockless-after-blockless'
            ]
        }],
        'at-rule-no-unknown': null,
        'color-named': 'never',
        'font-family-name-quotes': 'always-where-required',
        'function-url-quotes': 'always',
        'indentation': 4,
        'max-empty-lines': 1,
        'max-nesting-depth': 3,
        'no-unknown-animations': true,
        'number-leading-zero': 'never',
        'order/properties-order': propertiesOrder,
        'selector-class-pattern': [/^(.)?([a-z0-9](-[a-z0-9])?)+(__([a-z0-9].?)+)?(--([a-z0-9].?)+)?$/, { resolveNestedSelectors: true }],
        'selector-list-comma-newline-before': 'never-multi-line',
        'selector-list-comma-space-after': 'always-single-line',
        'selector-max-id': 0,
        'string-quotes': 'single',
        'value-keyword-case': 'lower',
        'value-no-vendor-prefix': true
    }
};
