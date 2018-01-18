const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
// const bcrypt = require('bcrypt-nodejs');
// const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
  email: {type: String, required: true},
  // username: {type: String, required: true},
  // facebookID: {type: String, required: true},
  // facebookThirdPartyID: {type: String, required: true, default: "N/A"},
  // createdAt: {type: Date, default: Date.now}
});

userSchema.methods.name = function() {
  return this.email;
};

userSchema.plugin(findOrCreate);

// let noop = function(){};

// userSchema.pre("save", function(done){
//   var user = this;
//   if (!user.isModified("password")){
//     return done();
//   }
//   bcrypt.genSalt(SALT_FACTOR, function(err, salt){
//     if (err) {return done(err);}
//     bcrypt.hash(user.password, salt, noop,
//       function(err, hashedPassword){
//         if (err){return done(err);}
//         user.password = hashedPassword;
//         done();
//       });
//   });
// });

// userSchema.methods.checkPassword = function(guess, done){
//   bcrypt.compare(guess, this.password, function(err, isMatch){
//     done(err, isMatch);
//   });
// };

const User = mongoose.model("User", userSchema);
module.exports = User;
