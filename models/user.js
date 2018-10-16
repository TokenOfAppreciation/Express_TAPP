const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  email: {type: String, required: true},
  assigned: {type: Boolean, default: false},
  address: {type: String}
});

userSchema.methods.name = function() {
  return this.email;
};

userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
module.exports = User;
