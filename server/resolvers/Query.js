const User = require('../models/user')
const Project = require('../models/project')
const Assignment = require('../models/assignment');
// const { useSubscription } = require('@apollo/react-hooks');

const Query = {
  async user(parent, args, content, info) {
    // args: {userName, id}
    var userRet;
    if (args.id) {
      userRet = await User.findById(args.id).populate({
        path: 'projects',
        model: 'project',
        populate: {
          path: 'assignments',
          model: 'assignment'
        }
      });
    } else {
      userRet = await User.findOne({
        userName: args.userName
      }).populate({
        path: 'projects',
        model: 'project',
        populate: {
          path: 'assignments',
          model: 'assignment'
        }
      });
    }
    // console.log(userRet);
    return userRet
  },
  async project(parent, args, content, info) {
    // args: {id}
    var projectRet = await (await Project.findOne({ _id: args.id })).populate({
      path: 'assignments',
      model: 'assignment'
    })
    // console.log(projectRet);
    return projectRet
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
    var result = await User.find().populate({
      path: 'projects',
      model: 'project',
      populate: {
        path: 'assignments',
        model: 'assignment'
      }
    });
    return result;
  },
  async assignment(parent, args, content, info) {
    // console.log(args);
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