import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String },
  created: { type: Number, default: Date.now() },
  creatorId: {type: ObjectId, ref: models.user.name, required: true},
  // Relations
	householdId: { type: ObjectId, ref: models.household.name, required: true}
});

module.exports = mongoose.model(models.prize.name, schema);