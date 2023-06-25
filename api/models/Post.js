const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    categories: {
      type: Array,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    comments: {
      username: {
        type: String,
        required: true,
        unique: false,
      },
      userId: {
        type: String,
        required: true,
        unique: false,
      },
      body: {
        type: String,
        required: true,
        unique: false,
      },
      userPic: {
        type: String,
        required: false,
        unique: false,
      },
      date: {
        type: String,
        required: true,
        unique: false,
      },
      required: false,
      type: Array,
    },
    links: {
      link: {
        type: String,
        required: false,
        unique: false,
      },
      name: {
        type: String,
        required: false,
        unique: false,
      },
      required: false,
      type: Array,
    },
    photos: {
      photo: {
        type: String,
        required: false,
      },
      desc: {
        type: String,
        required: false,
      },
      required: false,
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
