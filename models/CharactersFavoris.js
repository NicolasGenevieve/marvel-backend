const mongoose = require("mongoose");

const CharactersFavoris = mongoose.model("CharactersFavoris", {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  characterId: {
    type: String,
    required: true,
  },
  name: String,
  thumbnail: {
    path: String,
    extension: String,
  },
  description: String,
});

module.exports = CharactersFavoris;
