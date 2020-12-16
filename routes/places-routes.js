const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/from-wantToVisit', (req, res, next) => {
    const { userID, poi } = req.body
  User.findById(userID)
    .then(user => {
      const { wantToVisit } = user
      wantToVisit.splice(wantToVisit.indexOf(poi), 1)
      User.findOneAndUpdate({_id: userID}, {wantToVisit: wantToVisit, $push: {alreadyVisited: poi}} )
    .then(result => {
        res.status(200).json(result)
        })
    })
    .catch(err => console.error(err))
})

router.post('/from-alreadyVisited', (req, res, next) => {
  const { userID, poi } = req.body
User.findById(userID)
  .then(user => {
    const { alreadyVisited } = user
    alreadyVisited.splice(alreadyVisited.indexOf(poi), 1)
    User.findOneAndUpdate({_id: userID}, {alreadyVisited, $push: {wantToVisit: poi}} )
  .then(result => {
      res.status(200).json(result)
      })
  })
  .catch(err => console.error(err))
})

router.post('/from-want-to-visit/delete/:poi', (req, res, next) => {
  const { userID } = req.body
  const { poi } = req.params
  console.log(userID, poi)
  User.findById(userID)
    .then(user => {
      console.log(user)
      const { wantToVisit } = user
      wantToVisit.splice(wantToVisit.indexOf(poi), 1)
      User.findOneAndUpdate({_id: userID}, {wantToVisit})
        .then(result => {
          res.status(200).json(result)
        })
    })
    .catch(err=>console.error(err))
})

router.post('/from-visited/delete/:poi', (req, res, next) => {
  const { userID } = req.body
  const { poi } = req.params
  console.log(userID, poi)
  User.findById(userID)
    .then(user => {
      console.log(user)
      const { alreadyVisited } = user
      alreadyVisited.splice(alreadyVisited.indexOf(poi), 1)
      User.findOneAndUpdate({_id: userID}, {alreadyVisited})
        .then(result => {
          res.status(200).json(result)
        })
    })
    .catch(err=>console.error(err))
})

router.post('/hotel/delete/:hotel', (req, res, next) => {
  const { userID } = req.body
  const { hotel } = req.params
  User.findById(userID)
    .then(user => {
      const { hotelsBooking } = user
      hotelsBooking.splice(hotelsBooking.indexOf(hotel), 1)
      User.findOneAndUpdate({_id: userID}, {hotelsBooking})
        .then(result => {
          res.status(200).json(result)
        })
    })
    .catch(err => console.error(err))
})
module.exports = router