import test from 'ava';
import stylelint from 'stylelint';
import config from '../';

/* eslint-disable */
const validCss = (`
.selector {
    margin: 1em 0;
}

input[type='text'] {
    line-height: 1.1;
}
`)

const invalidCss = (`
#selectorId {
    margin: 0;
}

.selectorClass {
    margin: 0;
}
`)
/* eslint-enable */

test('There are no warnings with selectors CSS', t => {
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

test('There are warnings with invalid selectors CSS', t => {
    return stylelint.lint({
        code: invalidCss,
        config: config
    }).then(data => {
        const { errored, results } = data;
        const { warnings } = results[0];

        t.truthy(errored, 'errored');
        t.is(warnings.length, 2, 'flags eight warnings');
        t.is(warnings[0].text, 'Expected class selector ".selectorClass" to match specified pattern (selector-class-pattern)', 'correct warning text');
        t.is(warnings[1].text, 'Expected "#selectorId" to have no more than 0 id selectors (selector-max-id)', 'correct warning text');
    });
});

