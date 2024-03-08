const Manager = require('./src/Manager');
const Wrapper = require('./src/Wrapper');
module.exports = (class extends Wrapper {
    static cls = {
        Manager,
        Wrapper,
        Tool: require('./src/Tool'),
    };
});