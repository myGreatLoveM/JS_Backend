const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // refernce to the post model
    },
    user_name: {
      type: String,
      required: true,
      maxLength: 50,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Like', likeSchema)
