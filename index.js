const Manager = require('./src/DAOSequelize');
module.exports = new (class extends Manager {
    cls = {
        Manager,
        Wrapper: require('./src/DAOWrapper'),
    };
});