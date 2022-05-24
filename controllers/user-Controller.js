const userService = require('../service/user-service.js');

class userController {
    async registration(req, res, next) {
        try {
            const {username, email, password} = req.body;
            const userData = await userService.registration(username, email, password);
            res.cookie('refresh', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch(e) {
            next(e);
        };
    };

};

module.exports = new userController;