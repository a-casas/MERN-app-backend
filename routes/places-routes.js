const express = require('express')
const router = express.Router()
const User = require('../models/User')
router.post('/from-leidos', (req, res, next) => {
    const { userID, poi } = req.body
  User.findById(userID)
    .then(user => {
      const { leidos } = user
      leidos.splice(leidos.indexOf(poi), 1)
      User.findOneAndUpdate({_id: userID}, {leidos: leidos, $push: {leyendo: poi}} )
    .then(result => {
        res.status(200).json(result)
        })
    })
    .catch(err => console.error(err))
})
router.post('/from-leyendo', (req, res, next) => {
  const { userID, poi } = req.body
User.findById(userID)
  .then(user => {
    const { leyendo } = user
    leyendo.splice(leyendo.indexOf(poi), 1)
    User.findOneAndUpdate({_id: userID}, {leyendo, $push: {leidos: poi}} )
  .then(result => {
      res.status(200).json(result)
      })
  })
  .catch(err => console.error(err))
})
router.post('/from-leidos/delete', (req, res, next) => {
  const { userID, poi } = req.body
  User.findById(userID)
    .then(user => {
      const { leidos } = user
      leidos.splice(leidos.indexOf(poi), 1)
      User.findOneAndUpdate({_id: userID}, {leidos})
        .then(result => {
          res.status(200).json(result)
        })
    })
    .catch(err=>console.error(err))
})
router.post('/from-leyendo/delete', (req, res, next) => {
  const { userID, poi } = req.body
  User.findById(userID)
    .then(user => {
      const { leyendo } = user
      leyendo.splice(leyendo.indexOf(poi), 1)
      User.findOneAndUpdate({_id: userID}, {leyendo})
        .then(result => {
          res.status(200).json(result)
        })
    })
    .catch(err => console.error(err))
})
router.post('/hotel', (req, res, next) => {
  const { userID, hotel } = req.body
  User.findById(userID)
    .then(user => {
      const { porLeer } = user
      porLeer.splice(porLeer.indexOf(hotel), 1)
      User.findOneAndUpdate({_id: userID}, {porLeer})
        .then(result => {
          res.status(200).json(result)
        })
    })
    .catch(err => console.error(err))
})
module.exports = router