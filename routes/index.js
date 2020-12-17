const express = require("express");
const User = require("../models/User");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.send("Home");
});

router.post("/wantToVisit", (req, res) => {
  User.findByIdAndUpdate(req.body.userID, {
    $push: { wantToVisit: req.body.mangaID },
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/alreadyVisited", (req, res) => {
  User.findByIdAndUpdate(req.body.userID, {
    $push: { alreadyVisited: req.body.mangaID },
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/hotelsBooking", (req, res) => {
  User.findByIdAndUpdate(req.body.userID, {
    $push: { hotelsBooking: req.body.mangaID },
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getUser/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/all-users", (req, res) => {
  User.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
