'use strict';

const stylelint = require('stylelint');
const getFlatLinterResult = require('./utils/getFlatLinterResult');
const config = require('../');

const validCSS = `
.selector {
    margin: 0;
    margin-left: 20px;
    background: #fff;
}
`;

const invalidCSS = `
.selector {
    background: #fff;
    margin-left: 20px;
    margin: 0;
}
`;

it('has no warnings with valid CSS properties', async () => {
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
        const result = getFlatLinterResult(await stylelint.lint({
            config,
            code: invalidCSS
        }));

        errored = result.errored;
        warnings = result.warnings;
    });

    it('has 3 warnings', () => {
        expect(errored).toBeTruthy();
        expect(warnings.length).toBe(3);
    });

    it('has invalid properties order', () => {
        expect(warnings[0].text).toBe('Expected "margin-left" to come before "background" (order/properties-order)');
        expect(warnings[1].text).toBe('Expected "margin" to come before "margin-left" (order/properties-order)');
    });

    it('has invalid property overrides', () => {
        expect(warnings[2].text).toBe('Unexpected shorthand "margin" after "margin-left" (declaration-block-no-shorthand-property-overrides)');
    });
});
