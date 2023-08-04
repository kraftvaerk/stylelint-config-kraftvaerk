'use strict';

const { isPlainObject } = require('is-plain-object');
const stylelint = require('stylelint');
const getFlatLinterResult = require('./utils/getFlatLinterResult');
const config = require('../');

const validCSS = `
a {
    top: 0;
}
`;

const invalidCSS = `
a {
  top: 0;
}
`;

it('has valid config format', () => {
    expect(isPlainObject(config)).toBeTruthy();
});

it('has no warnings with valid CSS', async () => {
    expect.assertions(2);

    const { errored, warnings } = getFlatLinterResult(await stylelint.lint({
        config,
        code: validCSS
    }));

    expect(errored).toBeFalsy();
    expect(warnings.length).toBe(0);
});

it('has invalid indentation in CSS', async () => {
    expect.assertions(3);

    const { errored, warnings } = getFlatLinterResult(await stylelint.lint({
        config,
        code: invalidCSS
    }));

    expect(errored).toBeTruthy();
    expect(warnings.length).toBe(1);
    expect(warnings[0].text).toBe('Expected indentation of 4 spaces (indentation)');
});
