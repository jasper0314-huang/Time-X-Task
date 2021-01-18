const User = require('../models/user')
const Project = require('../models/project')
const Assignment = require('../models/assignment')

const Query = {
  async user(parent, args, content, info) {
    //args: {name}
    console.log("==========");
    console.log(args);
    console.log("==========");
    var result;
    if (args.id)  {
      result = await User.findById(args.id)
    } else {
      result = await User.find({
        userName: args.userName
      })
    }
    console.log(result);
    console.log("==========");

    return result
  },
  async project(parent, args, content, info) {
    // args: {id}
    var result = await Project.find({
      id: args.id
    })
    return result
  },
  async userProject(parent, args, content, info) {
    // args: {userName, projectName}
    var userInfo = await User.find({
      userName: args.name
    })
    var projectsArr = []
    userInfo.projects.forEach(async projID => {
      var project = await Project.findById(projID)
      project.assignments.forEach(async assignID => {
        var assign = await Assignment.findById(assignID)
        
      })
    });
    return projectsArr
  },
}

module.exports = Query