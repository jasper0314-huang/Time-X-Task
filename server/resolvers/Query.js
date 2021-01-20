const User = require('../models/user')
const Project = require('../models/project')
const Assignment = require('../models/assignment');
const Record = require('../models/record')

const Query = {
  async users(parent, args, content, info) {
    var result = await User.find().populate({
      path: 'projects',
      model: 'project',
      populate: {
        path: 'assignments',
        model: 'assignment',
        populate: {
          path: 'records',
          model: 'record'
        }
      }
    });
    return result;
  },
  async user(parent, args, content, info) {
    // args: {userName, id}
    var userRet;
    if (args.id) {
      userRet = await User.findById(args.id).populate({
        path: 'projects',
        model: 'project',
        populate: {
          path: 'assignments',
          model: 'assignment',
          populate: {
            path: 'records',
            model: 'record'
          }
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
          model: 'assignment',
          populate: {
            path: 'records',
            model: 'record'
          }
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
      model: 'assignment',
      populate: {
        path: 'records',
        model: 'record'
      }
    })
    // console.log(projectRet);
    return projectRet
  },
  async assignment(parent, args, content, info) {
    // console.log(args);
    var result = await Assignment.findOne({
      _id: args.id
    }).populate({
      path: 'records',
      model: 'record'
    })
    return result
  },
  // async projectNames(parent, args, content, info) {
  //   var result
  // }
}

module.exports = Query