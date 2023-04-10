const User = require('../model/userModel.js');

const UserController = {
  createUser(req, res, next) {
		console.log('body: ', req.body)
    const { email, password } = req.body;
    User.create({ email, password })
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    });
  },
  
  verifyUser(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.locals.status = false;
        return next();
      } else {
        user.comparePassword(password, (err, isMatch) => {
          if (err) return next(err);
          res.locals.status = isMatch;
          res.locals.user = user;
          console.log('user is verified');
          return next();
        });
      }
    })
    .catch((err) => {
      return next(err);
    });
  },
};

module.exports = UserController;