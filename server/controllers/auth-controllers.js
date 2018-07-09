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
        res.json({ someSecureData: 123 });
    }
}