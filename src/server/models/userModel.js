const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// user should contain:

/*
Array of ports
Array of metrics
*/

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
    const user = this;
    bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
            return next(saltError);
        } else {
            bcrypt.hash(user.password, salt, function (hashError, hash) {
                if (hashError) {
                    return next(hashError);
                } else {
                    user.password = hash;
                    return next();
                }
            });
        }
    });
});

UserSchema.methods.comparePassword = function (enteredPassword, callback) {
    bcrypt.compare(enteredPassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
