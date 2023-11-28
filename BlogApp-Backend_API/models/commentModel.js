const mongoose = require('mongoose')

// route handler
const commentSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // refernce to the post model
    },
    user_name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    comment_body: {
      type: String,
      required: true,
      maxLength: 255,
    },
  },
  {
    timestamp: true,
  }
)

module.exports = mongoose.model('Comment', commentSchema)
