const User = require('../models/user')
const Project = require('../models/project')
const Assignment = require('../models/assignment');
const { useSubscription } = require('@apollo/react-hooks');

const Query = {
  async user(parent, args, content, info) {
    // args: {userName, id}
    var result;
    if (args.id) {
      result = await User.findById(args.id);
    } else {
      result = await User.findOne({
        userName: args.userName
      });
    }
    return result
  },
  async project(parent, args, content, info) {
    // args: {id}
    var result = await Project.findOne({
      _id: args.id
    })
    return result
  },
  // async userProject(parent, args, content, info) {
  //   // args: {userName, projectName}
  //   var userInfo = await User.findOne({
  //     userName: args.userName
  //   })
  //   var projectsArr = []
  //   userInfo.projects.forEach(async projID => {
  //     var project = await Project.findById(projID)
  //     project.assignments.forEach(async assignID => {
  //       var assign = await Assignment.findById(assignID)
        
  //     })
  //   });
  //   return projectsArr
  // },
  async users(parent, args, content, info) {
    var result = await User.find();
    return result;
  },
  async assignment(parent, args, content, info) {
    console.log(args);
    var result = await Assignment.findOne({
      _id: args.id
    })
    return result
  },
  // async projectNames(parent, args, content, info) {
  //   var result
  // }
}

module.exports = Query