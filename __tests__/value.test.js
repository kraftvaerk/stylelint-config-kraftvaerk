import stylelint from 'stylelint';
import getFlatLinterResult from './utils/getFlatLinterResult';
import config from '../';

const validCSS = `
.selector {
    margin: 0;
    margin-left: 20px;
    border-color: #fff;
    background: #fff;
    opacity: .5;
}
`;

const invalidCSS = `
.selector {
    margin:0;
    margin-left: 20PX;
    border-color: #FFFFFF;
    background: #FFF;
    opacity: 0.5
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

    beforeAll(async (done) => {
        const result = getFlatLinterResult(await stylelint.lint({
            config,
            code: invalidCSS
        }));

        errored = result.errored;
        warnings = result.warnings;

        done();
    });

    it('has 7 warnings', () => {
        expect(errored).toBeTruthy();
        expect(warnings.length).toBe(7);
    });

    it('has unexpected leading zeros', () => {
        expect(warnings[0].text).toBe('Unexpected leading zero (number-leading-zero)');
    });

    it('has invalid hex color case', () => {
        expect(warnings[1].text).toBe('Expected "#FFFFFF" to be "#ffffff" (color-hex-case)');
        expect(warnings[2].text).toBe('Expected "#FFF" to be "#fff" (color-hex-case)');
    });

    it('has invalid hex color length', () => {
        expect(warnings[3].text).toBe('Expected "#FFFFFF" to be "#FFF" (color-hex-length)');
    });

    it('has no trailing semicolons after property values', () => {
        expect(warnings[4].text).toBe('Expected a trailing semicolon (declaration-block-trailing-semicolon)');
    });

    it('has no spaces before property values', () => {
        expect(warnings[5].text).toBe('Expected single space after ":" with a single-line declaration (declaration-colon-space-after)');
    });
});
