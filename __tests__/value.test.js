'use strict';

const stylelint = require('stylelint');
const getFlatLinterResult = require('./utils/getFlatLinterResult');
const config = require('../');

const validCSS = `
.selector {
    margin: 0;
    margin-left: 20px;
    opacity: .5;
    border-color: #fff;
    background: #fff;
}
`;

const invalidCSS = `
.selector {
    margin: 0;
    margin-left: 20px;
    opacity: 0.5;
    border-color: #ffffff;
    background: #fff;
}
`;

it('has no warnings with valid CSS values', async () => {
    expect.assertions(2);

    const { errored, warnings } = getFlatLinterResult(await stylelint.lint({
        config,
        code: validCSS
    }));

    expect(errored).toBeFalsy();
    expect(warnings.length).toBe(0);
});

describe('invalid CSS', () => {
    let errored = null;
    let warnings = null;

    beforeAll(async () => {
        const linterResult = await stylelint.lint({
            config,
            code: invalidCSS
        });
        const result = getFlatLinterResult(linterResult);

        errored = result.errored;
        warnings = result.warnings;
    });

    it('has 2 warnings', () => {
        expect(errored).toBeTruthy();
        expect(warnings.length).toBe(2);
    });

    it('has invalid hex color length', () => {
        expect(warnings[0].text).toBe('Expected "#ffffff" to be "#fff" (color-hex-length)');
    });

    it('has unexpected leading zeros', () => {
        expect(warnings[1].text).toBe('Unexpected leading zero (number-leading-zero)');
    });
});
