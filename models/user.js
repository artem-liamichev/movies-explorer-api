const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
        message: 'Вам нужно ввести e-mail',
      },
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
  },
  { versionKey: false },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
