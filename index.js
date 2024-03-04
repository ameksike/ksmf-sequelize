const Manager = require('./src/Manager');
module.exports = new (class extends Manager {
    cls = {
        Manager,
        Wrapper: require('./src/Wrapper'),
        Tool: require('./src/Tool'),
    };
});