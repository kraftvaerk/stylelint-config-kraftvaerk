import test from 'ava';
import stylelint from 'stylelint';
import config from '../';

/* eslint-disable */
const validCss = (`
.selector { /* Correct usage of quotes */
    background-image: url('images/bg.png');
    font-family: Helvetica Neue, sans-serif;
}

.another-selector { /* Correct usage of zero values */
    font-family: Georgia, serif;
    text-shadow:
        0 -1px 0 rgba(0, 0, 0, .5),
        0 1px 0 #fff;
}
`)

const invalidCss = (`
.class { /* Avoid missing space and semicolon */
    background:#fff
}

.class { /* Avoid adding a unit on a zero value */
    margin: 0px 0 20px 0;
}
`)
/* eslint-enable */

test('There are no warnings with values CSS', t => {
    return stylelint.lint({
        code: validCss,
        config: config
    })
    .then(data => {
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
    })
    .then(data => {
        const { errored, results } = data;
        const { warnings } = results[0];

        t.truthy(errored, 'errored');
        t.is(warnings.length, 4, 'flags eight warnings');
        t.is(warnings[0].text, 'Expected a trailing semicolon (declaration-block-trailing-semicolon)', 'correct warning text');
        t.is(warnings[1].text, 'Expected single space after ":" with a single-line declaration (declaration-colon-space-after)', 'correct warning text');
        t.is(warnings[2].text, 'Unexpected duplicate selector ".class" (no-duplicate-selectors)', 'correct warning text');
        t.is(warnings[3].text, 'Unexpected unit (length-zero-no-unit)', 'correct warning text');
    });
});
