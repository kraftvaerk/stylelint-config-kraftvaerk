import test from 'ava';
import stylelint from 'stylelint';
import config from '../';

/* eslint-disable */
const validCss = (`
.selector {
    margin: 0;
    margin-left: 20px;
    background: #fff;
}
`)

const invalidCss = (`
.selector {
    background:#FFFFFF;
    margin-left: 20PX;
    margin: 0;
}
`)
/* eslint-enable */

test('There are no warnings with properties CSS', t => {
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


test('There are warnings with invalid properties CSS', t => {
    return stylelint.lint({
        code: invalidCss,
        config: config
    }).then(data => {
        const { errored, results } = data;
        const { warnings } = results[0];

        t.truthy(errored, 'errored');
        t.is(warnings.length, 7, 'flags seven warnings');
        t.is(warnings[0].text, 'Expected "margin-left" to come before "background" (order/properties-order)', 'correct warning text');
        t.is(warnings[1].text, 'Expected "margin" to come before "margin-left" (order/properties-order)', 'correct warning text');
        t.is(warnings[2].text, 'Expected "#FFFFFF" to be "#ffffff" (color-hex-case)', 'correct warning text');
        t.is(warnings[3].text, 'Expected "#FFFFFF" to be "#FFF" (color-hex-length)', 'correct warning text');
        t.is(warnings[4].text, 'Expected single space after ":" with a single-line declaration (declaration-colon-space-after)', 'correct warning text');
        t.is(warnings[5].text, 'Expected "PX" to be "px" (unit-case)', 'correct warning text');
        t.is(warnings[6].text, 'Unexpected shorthand "margin" after "margin-left" (declaration-block-no-shorthand-property-overrides)', 'correct warning text');
    });
});
