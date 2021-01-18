const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const AssignmentSchema = new Schema({
	assignmentName: {
		type: String,
		required: [true, 'name field is required.']
	},
	deadline: {
		type: Date,
		required: [true, 'deadline field is required.']
	},
	record: [{
		startAt: Date,
		duration: Number
	}],
	status: {
		type: Number
	}
})

// Usage of Date !!
// Assignment.findOne(function (err, doc) {
// 	doc.dueDate.setMonth(3);
// 	doc.save(callback); // THIS DOES NOT SAVE YOUR CHANGE
  
// 	doc.markModified('dueDate');
// 	doc.save(callback); // works
// })

// Creating a table within database with the defined schema
const Assignment = mongoose.model('assignment', AssignmentSchema)

// Exporting table for querying and mutating
module.exports = Assignment
