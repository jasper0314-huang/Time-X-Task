const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const ProjectSchema = new Schema({
	projectName: {
		type: String,
		required: [true, 'Title field is required.']
	},
	assignments: [Schema.Types.ObjectId],
	links: [String]

})

// Creating a table within database with the defined schema
const Project = mongoose.model('project', ProjectSchema)

// Exporting table for querying and mutating
module.exports = Project
