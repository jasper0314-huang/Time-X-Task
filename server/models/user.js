const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Project = require('./project')

// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
	userName: {
		type: String,
		required: [true, 'Name field is required.']
	},
	projects: [
		Project
	],
})

// Creating a table within database with the defined schema
const User = mongoose.model('user', UserSchema)

// Exporting table for querying and mutating
module.exports = User
