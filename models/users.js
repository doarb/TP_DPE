const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

UserSchema.virtual('element').get(function() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email
    };
  });

module.exports = mongoose.model('dbo-users', UserSchema);
