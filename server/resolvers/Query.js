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
    var projectRet = await Project.findOne({ _id: args.id }).populate({
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
  async projectNames(parent, args, content, info) {
    var name_set = new Set();
    var projects = await Project.find();
    projects.forEach( (element) => {
      name_set.add(element.projectName)
    })
    var project_names = [];
    for (let name_i of name_set) {
      project_names.push({ name: name_i, count: 1 })
    }
    return project_names
  },
  async assignmentNames(parent, { projectName }, content, info) {
    if (!projectName) {
      return [];
    }
    var name_set = new Set();
    let projects = await Project.find({
      "projectName": projectName
    }).populate({
      path: 'assignments',
      model: 'assignment',
    })
    for (let project_i of projects) {
      project_i.assignments.forEach( (ele) => {
        name_set.add(ele.assignmentName)
      } )
    }
    var assignment_names = [];
    for (let name_i of name_set) {
      assignment_names.push({ name: name_i, count: 1 })
    }
    return assignment_names
  },
  async searchStats(parent, args, content, info) {
    let time_array = [];
    let projects = await Project.find({
      "projectName": args.projectName
    }).populate({
      path: 'assignments',
      model: 'assignment',
      populate: {
        path: 'records',
        model: 'record'
      }
    })

    if (args.assignmentName) {
      for (let project_i of projects) {
        for (let assignment_i of project_i.assignments) {
          let time_sum = 0;
          if (assignment_i.assignmentName === args.assignmentName) {
            for (let record_i of assignment_i.records) {
              time_sum = record_i.duration + time_sum
            }
          }
          time_array.push(time_sum)
        }
      }
    } else {
      for (let project_i of projects) {
        let proj_time_sum = 0;
        for (let assignment_i of project_i.assignments) {
          for (let record_i of assignment_i.records) {
            proj_time_sum = record_i.duration + proj_time_sum
          }
        }
        time_array.push(proj_time_sum)
      }
    }
    return time_array
  }
}

module.exports = Query