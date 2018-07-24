module.exports = {
    logout: (req, res) => {
        req.session.destroy();
        res.send();
    },
    userData: (req, res) => {
        res.json({ user: req.session.user });
    },
    checkLoggedIn: (req, res, next) => {
        if (req.session.user) {
            next();
        } else {
            res.status(403).json({ message: 'Unauthorized' });
        }
    },
    secureUserData: (req, res) => {
        res.json({
            name: req.session.user.name,
            picture: req.session.user.picture
        });
    }
}