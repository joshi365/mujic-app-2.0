const express = require("express");
const router = express.Router();
const verify = require("./VerifyToken");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//Modals
const Profile = require("../model/profileModal");
const User = require("../model/User");

//@route GET api/profile
//@desc Get User Profile
//@acess Private

router.get("/", verify, async (req, res) => {
  // console.log(req.header("authToken"));
  Profile.findOne({ user: req.user._id })
    .then((profile) => {
      if (!profile) {
        return res.status(400).send("no profile found");
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;

//@route POST api/profile
//@desc Create and Update User Profile
//@acess Private

router.post("/", verify, (req, res) => {
  const skillSet = req.body.skills.split(",");

  const newProfile = {
    user: req.user._id,
    instrument: req.body.instrument,
    location: req.body.location,
    skills: skillSet,
  };

  //Updates Profile
  Profile.findOne({ user: req.user._id })
    .then((profile) => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: newProfile },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //Create
        //Save Profile
        new Profile(newProfile).save().then((profile) => res.json(profile));
      }
    })
    .catch((err) => res.status(404).json(err));
});
