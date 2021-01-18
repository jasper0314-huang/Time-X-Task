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
      { userName: data.userName },
      { $push: { projects: newProject } }
    )
    return newProject;
  }
}

module.exports = Mutation
