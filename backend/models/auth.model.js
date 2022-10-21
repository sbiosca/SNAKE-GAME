const mongoose = require("mongoose");


const AuthSchema = mongoose.Schema({
  reference: {
    type: Number,
  },
  user: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  passw: {
    type: String,
    required: true
  },
  score: {
    type: Number
  }
});


// AuthSchema.pre("validate", function (next) {
//   if (!this.slug) {
//     this.slugify();
//   }
//   next();
// });

// AuthSchema.methods.slugify = function () {
//   this.slug =
//     slug(this.user);
// };

AuthSchema.methods.toListJSONFor = function () {
  return {
    reference: this.reference,
    user: this.user,
    email: this.email,
    passw: this.passw,
    score: this.score
  };
};

module.exports = mongoose.model("auth", AuthSchema);