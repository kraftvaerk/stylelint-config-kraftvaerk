module.exports = {
    rules: {
        'at-rule-empty-line-before': [ 'always', {
            'except': [ 'blockless-group', 'first-nested' ],
            'ignore': ['after-comment']
        } ],
        'at-rule-name-case': 'lower',
        'at-rule-name-space-after': 'always-single-line',
        'at-rule-no-vendor-prefix': null,
        'at-rule-semicolon-newline-after': 'always',

        'media-feature-colon-space-after': 'always',
        'media-feature-colon-space-before': 'never',
        'media-feature-name-no-vendor-prefix': null,
        'media-feature-no-missing-punctuation': true,
        'media-feature-range-operator-space-after': 'always',
        'media-feature-range-operator-space-before': 'always',
        'media-query-parentheses-space-inside': 'never',
        'media-query-list-comma-newline-after': 'always-multi-line',
        'media-query-list-comma-newline-before': 'never-multi-line',
        'media-query-list-comma-space-after': 'always-single-line',
        'media-query-list-comma-space-before': 'never'
    }
};
