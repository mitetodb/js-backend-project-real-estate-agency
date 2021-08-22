const housingService = require('../services/housing');

module.exports = () => (req, res, next) => {
    // import and decorate services.
    req.storage = {
        ...housingService
    };

    next();
};