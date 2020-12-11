const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupsSchema = new Schema({
  wantToVisit: {type: [String]},
  alreadyVisited: {type: [String]},
  hotelsBooking: {type: [String]},
})

const Groups = mongoose.model('Groups', groupsSchema)

module.exports = Groups