module.exports = {
    rules: {
        'custom-media-pattern': /^([a-z]+-+?)*([a-z]+)$/,
        'custom-property-no-outside-root': true,
        'custom-property-pattern': /^.([a-z](-[a-z])?)+(__([a-z](-[a-z])?)+)?(--([a-z](-[a-z])?)+)?$/
    }
};
