'use strict';

const stylelint = require('stylelint');
const getFlatLinterResult = require('./utils/getFlatLinterResult');
const config = require('../');

const validCSS = `
/**
 * #.# Section title
 *
 * Description of section, whether or not it has media queries, etc.
 */

.selector {
    float: left;
}

/**
 * #.# Another section title
 *
 * Description of section, whether or not it has media queries, long comments
 * should manually break the line length at 80 characters.
 */

.selector__test {
    float: right;
}

/* This is a comment about this selector */
.another-selector {
    position: absolute;
    top: 0 !important; /* I should explain why this is so !important */
}
`;

const invalidCSS = `
/**
* #.# Section title
*
* Description of section, whether or not it has media queries, etc.
*/
.selector {
    float: left;
}
/**
* #.# Another section title
*
* Description of section, whether or not it has media queries, long comments
* should manually break the line length at 80 characters.
*/
.selector__test {
    float: right;
}
/* This is a comment about this selector */
.another-selector {
    position: absolute;
    top: 0 !important; /* I should explain why this is so !important */
}
`;

it('has no warnings with valid comments in CSS', async () => {
    expect.assertions(2);

    const { errored, warnings } = getFlatLinterResult(await stylelint.lint({
        config,
        code: validCSS
    }));

    expect(errored).toBeFalsy();
    expect(warnings.length).toBe(0);
});

it('has invalid comments in CSS', async () => {
    expect.assertions(4);

    const { errored, warnings } = getFlatLinterResult(await stylelint.lint({
        config,
        code: invalidCSS
    }));

    const message = 'Expected empty line before comment (comment-empty-line-before)';

    expect(errored).toBeTruthy();
    expect(warnings.length).toBe(2);
    expect(warnings[0].text).toBe(message);
    expect(warnings[1].text).toBe(message);
});
