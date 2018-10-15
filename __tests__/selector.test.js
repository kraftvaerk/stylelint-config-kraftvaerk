'use strict';

const stylelint = require('stylelint');
const getFlatLinterResult = require('./utils/getFlatLinterResult');
const config = require('../');

const validCSS = `
.selector {
    margin: 1em 0;
}

input[type='text'] {
    line-height: 1.1;
}
`;

const invalidCSS = `
#selectorId {
    margin: 1em 0;
}

.selectorClass {
    line-height: 1.1;
}

.selectorClass {
    margin: 0;
}
`;

it('has no warnings with valid CSS selectors', async () => {
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

    beforeAll(async (done) => {
        const result = getFlatLinterResult(await stylelint.lint({
            config,
            code: invalidCSS
        }));

        errored = result.errored;
        warnings = result.warnings;

        done();
    });

    it('has 4 warnings', () => {
        expect(errored).toBeTruthy();
        expect(warnings.length).toBe(4);
    });

    it('has invalid class names', () => {
        const message = 'Expected class selector ".selectorClass" to match specified pattern (selector-class-pattern)';

        expect(warnings[0].text).toBe(message);
        expect(warnings[1].text).toBe(message);
    });

    it('has id selectors', () => {
        expect(warnings[2].text).toBe('Expected "#selectorId" to have no more than 0 ID selectors (selector-max-id)');
    });

    it('has duplicate selectors', () => {
        expect(warnings[3].text).toBe('Unexpected duplicate selector ".selectorClass", first used at line 6 (no-duplicate-selectors)');
    });
});
