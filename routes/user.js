const uid = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  console.log("BODY REÇU ===>", req.body);
  try {
    const { email, username, password } = req.body;

    const emailFound = await User.findOne({ email });
    console.log(email);

    const userFound = await User.findOne({ username });
    console.log(username);

    if (emailFound) {
      return res.status(400).json(`L'email ${email} possède déjà un compte`);
    } else if (userFound) {
      return res
        .status(400)
        .json(`Le nom d'utilisateur ${username} est déjà pris`);
    } else if (!username) {
      return res.status(400).json(`Veuillez entrer un username`);
    } else if (!password) {
      return res.status(400).json(`Veuillez entrer un mot de passe valide`);
    } else if (!email) {
      return res.status(400).json(`Veuillez entrer un email valide`);
    } else {
      const salt = uid(36);
      console.log(salt);

      const token = uid(24);
      console.log(token);

      const passwordToHash = req.body.password + salt;

      const hash = SHA256(passwordToHash).toString(encBase64);
      console.log(hash);

      const newUser = new User({
        email: email,
        username: username,
        token: token,
        hash: hash,
        salt: salt,
      });

      console.log(newUser);
      await newUser.save();

      const response = {
        _id: newUser._id,
        token: newUser.token,
        username: newUser.username,
      };
      return res.status(201).json(response);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const authReq = {
      username: req.body.username,
      password: req.body.password,
    };

    const userToAuthentify = await User.findOne({ username: authReq.username });

    if (!userToAuthentify) {
      return res
        .status(400)
        .json({ message: "Username ou mot de passe incorrect !" });
    }
    console.log(userToAuthentify);

    const newHash = SHA256(authReq.password + userToAuthentify.salt).toString(
      encBase64
    );

    if (newHash === userToAuthentify.hash) {
      const response = {
        _id: userToAuthentify._id,
        token: userToAuthentify.token,
        username: userToAuthentify.username,
      };
      return res.status(201).json(response);
    } else {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect !" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/user/profile", isAuthenticated, async (req, res) => {
  try {
    const { username } = req.user;
    return res.status(200).json({ username });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
