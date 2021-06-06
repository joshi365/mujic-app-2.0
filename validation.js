const Joi = require("@hapi/joi");

//Registe validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(55).required(),
    number: Joi.string().length(10).required(),
    password: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255),
  });
  return schema.validate(data);
};

//Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    number: Joi.string().length(10).required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;

//Profile Validation

// const profileValidation = (data) => {
//   const schema = Joi.object({
//     // handle: Joi.string().min(6).max(255).email().required(),
//     name: Joi.string().min(3).max(255).required(),
//     lastName: Joi.string().min(3).max(255).required(),
//     mobile: Joi.string().length(10).regex(/^\d+$/).required(),
//     instrument: Joi.string().min(3).max(255).required(),
//     location: Joi.string().min(3).max(255).required(),
//     skills: Joi.string().min(4).max(255),
//   });
//   return schema.validate(data);
// };

//Music Add Validatons

const musicValidation = (data) => {
  const schema = Joi.object({
    song: Joi.string().min(3).max(50).required(),
    artist: Joi.string().min(3).max(50).required(),
    album: Joi.string().min(3).max(50).required(),
    scale: Joi.string().min(3).max(50).required(),
    chords: Joi.string().min(3).max(50).required(),
    chordPattern: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.musicValidation = musicValidation;
// module.exports.profileValidation = profileValidation;
