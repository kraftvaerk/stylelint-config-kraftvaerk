import test from 'ava';
import stylelint from 'stylelint';
import isPlainObj from 'is-plain-object';
import config from '../';

const validCss = (`
a {
    top: .1em;
}
`);

const invalidCss = (`
a {
  top: 0.1em;
}

`);

test('validate config', t => {
    return t.true(isPlainObj(config));
});

test('no warnings with valid css', t => {
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

test('a warning with invalid css', t => {
    return stylelint.lint({
        code: invalidCss,
        config: config
    }).then(data => {
        const { errored, results } = data;
        const { warnings } = results[0];

        t.truthy(errored, 'errored');
        t.is(warnings.length, 2, 'flags one warning');
        t.is(warnings[0].text, 'Expected indentation of 4 spaces (indentation)', 'correct warning text');
        t.is(warnings[1].text, 'Unexpected leading zero (number-leading-zero)', 'correct warning text');
    });
});
