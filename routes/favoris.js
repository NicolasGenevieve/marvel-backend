const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

const ComicsFavoris = require("../models/ComicsFavoris");

const CharactersFavoris = require("../models/CharactersFavoris");

router.post("/favoris/comics", isAuthenticated, async (req, res) => {
  try {
    const { comicId, title, thumbnail, extension, description } = req.body;

    const newComicsFavoris = new ComicsFavoris({
      comicId: comicId,
      title: title,
      thumbnail: thumbnail,
      extension: extension,
      description: description,
      user: req.user._id,
    });

    await newComicsFavoris.save();

    const populateComicsFavoris = await ComicsFavoris.findById(
      newComicsFavoris._id
    ).populate({
      path: "user",
      select: "username",
    });
    return res.status(200).json(populateComicsFavoris);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/favoris/comics", isAuthenticated, async (req, res) => {
  try {
    const getComicsFavoris = await ComicsFavoris.find({ user: req.user._id });
    return res.status(200).json(getComicsFavoris);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/favoris/characters", isAuthenticated, async (req, res) => {
  try {
    const { characterId, name, thumbnail, extension, description } = req.body;

    const newCharacterFavoris = new CharactersFavoris({
      characterId: characterId,
      name: name,
      thumbnail: thumbnail,
      extension: extension,
      description: description,
      user: req.user._id,
    });

    await newCharacterFavoris.save();

    const populateCharacterFavoris = await CharactersFavoris.findById(
      newCharacterFavoris._id
    ).populate({
      path: "user",
      select: "username",
    });
    return res.status(200).json(populateCharacterFavoris);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/favoris/characters", isAuthenticated, async (req, res) => {
  try {
    // console.log(req.user);
    const getCharacterFavoris = await CharactersFavoris.find({
      user: req.user._id,
    });
    return res.status(200).json(getCharacterFavoris);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/favoris/comics/:id", isAuthenticated, async (req, res) => {
  try {
    const deleted = await ComicsFavoris.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Favoris non trouvé" });
    }

    return res.status(200).json({ message: "Favoris supprimé" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/favoris/characters/:id", isAuthenticated, async (req, res) => {
  try {
    const deleted = await CharactersFavoris.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Favoris non trouvé" });
    }

    return res.status(200).json({ message: "Favoris supprimé" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
