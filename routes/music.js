const router = require("express").Router();
const Music = require("../model/songModal");
const { musicValidation } = require("../validation");
const verify = require("./VerifyToken");

//GET MUSIC LIST
router.get("/",verify, async (req, res) => {
  console.log(verify,'ver')
  Music.find({})
    .then((music) => {
      res.json(music);
    })
    .catch((err) => res.status(404).json(err));
});

//ADD TO MUSIC LIST
router.post("/", async (req, res) => {
  const { error } = musicValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const music = new Music({
    song: req.body.song,
    artist: req.body.artist,
    album: req.body.album,
    scale: req.body.scale,
    chords: req.body.chords,
    chordPattern: req.body.chordPattern,
  });

  try {
    const savedMusic = await music.save();
    res.send(music);
  } catch (error) {
    res.status(400).send(error);
  }
});

//UPDATE MUSIC LIST

router.patch("/", async (req, res) => {
  const music = new Music({
    song: req.body.song,
    artist: req.body.artist,
    album: req.body.album,
    scale: req.body.scale,
    chords: req.body.chords,
    chordPattern: req.body.chordPattern,
    _id: req.body.id,
  });

  Music.findOne({ _id: req.body.id }).then((awsome) => {
    try {
      if (awsome) {
        Music.findOneAndUpdate(
          { _id: req.body.id },
          { $set: music },
          { new: true }
        ).then((profile) => res.json(profile));
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });
});

//Delete Music

router.delete("/:id", async (req, res) => {
  // console.log(req.params.id);

  try {
    Music.deleteOne({ _id: req.params.id }).then((data) =>
      res.status(200).send(data)
    );
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
