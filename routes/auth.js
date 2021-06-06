const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Twillo setup
const client = require("twilio")(config.accountSID, config.authToken);

//TWILIO SEND OTP
router.post("/otp", async (req, res) => {
  const mobileNumber = req.body.number;

  const numberExist = await User.findOne({ number: req.body.number });
  if (numberExist) return res.status(404).send("number already registered");
  else
    client.verify
      .services(config.serviceID)
      .verifications.create({
        to: `+91${mobileNumber}`,
        channel: "sms",
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => res.status(404).json(err));
});

//TWILIO VERIFY OTP

router.post("/verify", (req, res) => {
  const mobileNumber = req.body.number;
  // console.log(mobileNumber, "hihi");
  const otp = req.body.otp;

  client.verify
    .services(config.serviceID)
    .verificationChecks.create({
      to: `+91${mobileNumber}`,
      code: otp,
    })
    .then((data) => {
      // console.log(data);
      res.status(200).send(data.valid);
    })
    .catch((err) => res.status(404).json(err));
});

//REGISTER USER
router.post("/register", async (req, res) => {
  //VALIDATION
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if user already in database

  const numberExist = await User.findOne({ number: req.body.number });
  if (numberExist) return res.status(400).send("number already registered");

  //HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //CREATE A USER
  const user = new User({
    // userName: req.body.userName,
    number: req.body.number,
    password: hashPassword,
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const savedUser = await user.save();
    res.status(200).send(user._id);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login USER

router.post("/login", async (req, res) => {
  //VALIDATE BEFORE LOGIN
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //CHECKING IF THE Number EXISTS OR NOT
  const user = await User.findOne({ number: req.body.number });
  if (!user) return res.status(400).send("number or Password is wrong");

  //PASSWORD IS CORRECT OR NOT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Incorrect Password");

  //Create AND ASSIGN TOKEN
  if (validPass) {
    const token = jwt.sign({ _id: user._id }, config.tokenSecret);
    res.status(200).header("auth-token", token).send(token);
  }
});

module.exports = router;
