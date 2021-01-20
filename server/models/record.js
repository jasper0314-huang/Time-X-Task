const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const RecordSchema = new Schema({
	startAt: {
		type: Date
	},
	duration: {
		type: Number,
		default: 0
	}
})

// Creating a table within database with the defined schema
const Record = mongoose.model('record', RecordSchema)

// Exporting table for querying and mutating
module.exports = Record
