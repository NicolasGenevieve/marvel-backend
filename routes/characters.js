const express = require("express");
const router = express.Router();
const axios = require("axios");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/characters", isAuthenticated, async (req, res) => {
  try {
    const { name = "", limit = 100, skip = 0 } = req.query;

    console.log(name);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_APIKEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    // console.log(response.data.count);
    // console.log(response.data.result);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/character/:characterId", isAuthenticated, async (req, res) => {
  try {
    const { characterId } = req.params;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.MARVEL_APIKEY}`
    );
    // console.log(characterId);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
