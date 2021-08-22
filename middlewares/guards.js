function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/404');
        }
    };
}

function isGuest() {
        return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.redirect('/404');
        }
    };
}

module.exports = {
    isUser,
    isGuest
};