const User = require('../models/user')
const Project = require('../models/project')
const Assignment = require('../models/assignment')

const Mutation = {
  createUser: async (_, { data }, pubSub, info) => {
    const newUser = new User({ userName: data.userName, projects: []});
    const error = await newUser.save();
    // // pubSub.publish('message', {
    // //   message: {
    // //     mutation: "CREATED",
    // //     data: newUser
    // //   }
    // // })

    if (error) return error
    return newUser;
  },
  deleteUser: async (_, { userName }, pubSub, info) => {
    if (userName) {
      await User.deleteOne({
        userName: userName
      })
      return `User: ${userName} deleted!!`;
    } else {
      await User.deleteMany();
      return `Delete all Users`
    }
  },
  createProject: async (_, { data }, pubSub, info) => {
    const newProject = new Project({ projectName: data.projectName });
    const error = await newProject.save();
    await User.updateOne(
      { _id: data.userID },
      { $push: { projects: newProject } }
    )
    return newProject;
  },
  deleteProject: async (_, { id }, pubSub, info) => {
    if (id) {
      await Project.deleteOne({
        _id: id
      });
      await User.updateMany(
        {},
        { "$pull": { "projects": {"_id": id} } }
      )
      return `delete project id: ${id}`

    } else {
      // await Project.deleteMany();
      // await User.updateMany(
      //   {},
      //   { $set: { "projects": [] } }
      // )
      // return `Delete all Projects`
      return `No projectID input`
    }
  },
  createAssignment: async (_, { data }, pubSub, info) => {
    const newAssignment = new Assignment({ assignmentName: data.assignmentName });
    const error = await newAssignment.save();
    // await User.updateOne(
    //   { userName: data.userName },
    //   { $push: { projects: newAssignment } }
    // )
    await Project.updateOne(
      { _id: data.projectID },
      { $push: { "assignments": newAssignment } }
    )
    
    await User.updateOne(
      { _id: data.userID, "projects._id": data.projectID },
      { $push: {
        "projects.$.assignments": newAssignment
      } } 
      // { $push: { "projects": { "assignments": newAssignment } } }
    )
    return newAssignment;
  },
  deleteAssignment: async (_, { id }, pubSub, info) => {
    if (id) {
      await Assignment.deleteOne({
        _id: id
      })
      await User.updateMany(
        {},
        { "$pull": { "projects.$[].assignments": {"_id": id} } }
      )
      await Project.updateMany(
        {},
        { "$pull": { "assignments": {"_id": id} } }
      )
      return `delete assignment id: ${id}`
    } else {
      // await Assignment.deleteMany();
      return `No assignment id input`
    }
  }, // can't delete assignment since the time record should be preserve
}

module.exports = Mutation
