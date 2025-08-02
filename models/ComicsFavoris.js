const mongoose = require("mongoose");

const ComicsFavoris = mongoose.model("ComicsFavoris", {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comicId: {
    type: String,
    required: true,
  },
  title: String,
  thumbnail: {
    path: String,
    extension: String,
  },
  description: String,
});

module.exports = ComicsFavoris;
