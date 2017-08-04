import test from 'ava';
import stylelint from 'stylelint';
import config from '../';

/* eslint-disable */
const validCss = (`
/* Correct usage of quotes */
.selector {
    background-image: url('images/bg.png');
    font-family: Helvetica Neue, sans-serif;
}

/* Correct usage of zero values */
.another-selector {
    font-family: Georgia, serif;
    text-shadow:
        0 -1px 0 rgba(0, 0, 0, .5),
        0 1px 0 #fff;
}
`)

const invalidCss = (`
/* Avoid missing space and semicolon */
.class {
    background:#fff
}

/* Avoid adding a unit on a zero value */
.class {
    margin: 0px 0 20px 0;
}
`)
/* eslint-enable */

test('There are no warnings with values CSS', t => {
    return stylelint.lint({
        code: validCss,
        config: config
    }).then(data => {
        const { errored, results } = data;
        const { warnings } = results[0];

        t.falsy(errored, 'no errored');
        t.is(warnings.length, 0, 'flags no warnings');
    });
});

test('There are warnings with invalid values CSS', t => {
    return stylelint.lint({
        code: invalidCss,
        config: config
    }).then(data => {
        const { errored, results } = data;
        const { warnings } = results[0];

        t.truthy(errored, 'errored');
        t.is(warnings.length, 4, 'flags eight warnings');
        t.is(warnings[0].text, 'Unexpected duplicate selector ".class", first used at line 3 (no-duplicate-selectors)', 'correct warning text');
        t.is(warnings[1].text, 'Expected a trailing semicolon (declaration-block-trailing-semicolon)', 'correct warning text');
        t.is(warnings[2].text, 'Expected single space after ":" with a single-line declaration (declaration-colon-space-after)', 'correct warning text');
        t.is(warnings[3].text, 'Unexpected unit (length-zero-no-unit)', 'correct warning text');
    });
});
