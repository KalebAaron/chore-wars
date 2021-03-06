let mongoose = require('mongoose')
import { models } from '../config/constants'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let bcrypt = require('bcryptjs')
const SALT_FACTOR = 10

let schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
	points: { type: Object, default: {} },
	// isWinner: [{ type: Boolean, default: false }],
  completedChores: [{ type: ObjectId, ref: models.completedChore.name }],
  created: { type: Number, required: true, default: Date.now() },
	householdIds: [{ type: ObjectId, ref: models.household.name }]
})


schema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    } else {
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
      });
    }
  });
});

schema.post("save", function(err, user, next) {
  console.log("error?", error)
  next()
})

schema.methods.validatePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err || !isMatch) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  })
};

module.exports = mongoose.model('User', schema)