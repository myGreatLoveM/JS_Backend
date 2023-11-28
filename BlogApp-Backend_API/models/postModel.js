const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 50,
    },
    user_name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    post_body: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },

  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', postSchema)
