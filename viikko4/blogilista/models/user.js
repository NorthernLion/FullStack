const mongoose = require('mongoose')

const User = mongoose.model('User', {
  useranme: String,
  name: String,
  passwordHash: String,
  adult: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

User.format = function (user) {
  return {
    id: user._id,
    useranme: user.username,
    name: user.name,
    adult: user.adult
  }
}


module.exports = User