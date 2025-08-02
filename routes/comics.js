const express = require("express");
const router = express.Router();
const axios = require("axios");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/comics", isAuthenticated, async (req, res) => {
  try {
    const { title = "", limit = 100, skip = 0 } = req.query;

    console.log(title);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_APIKEY}&title=${title}&skip=${skip}&limit=${limit}`
    );
    console.log(response.data.count);
    console.log(response.data.result);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/comics/character/:characterId",
  isAuthenticated,
  async (req, res) => {
    try {
      const { characterId } = req.params;
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_APIKEY}`
      );
      // console.log(characterId);
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get("/comics/comic/:comicId", isAuthenticated, async (req, res) => {
  try {
    const { comicId } = req.params;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.MARVEL_APIKEY}`
    );
    // console.log(comicId);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
