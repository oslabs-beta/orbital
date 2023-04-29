const User = require("../models/userModel.js");

const UserController = {
    async createUser(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = new User({ email: email, password: password });
            await user.save();
            res.locals.account_created = user;
            return next();
        } catch (err) {
            err.message = "Error in UserController.createUser middleware.";
            return next(err);
        }
    },

    verifyUser(req, res, next) {
        const { email, password } = req.body;
        console.log(email, password)
        User.findOne({ email: email })
            .then((user) => {
                console.log('user: ', user)
                if (!user) {
                    console.log('no user found')
                    res.locals.user = false;
                    return next();
                } else {
                    console.log('user found')
                    user.comparePassword(password, (err, isMatch) => {
                        if (err) return next(err);
                        res.locals.user = user;
                        console.log("user is verified");
                        return next();
                    });
                }
            })
            .catch((err) => {
                return next(err);
            });
    },
    getUser(req, res, next) {
        const { id } = req.params;
        console.log({ id });
        User.findOne({ _id: id })
            .then((data) => {
                res.locals.user = data;
                next();
            })
            .catch((err) => {
                return next(err);
            });
    },
};

module.exports = UserController;