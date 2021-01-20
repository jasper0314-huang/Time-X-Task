const User = require('../models/user')
const Project = require('../models/project')
const Assignment = require('../models/assignment')
const Record = require('../models/record')


const Mutation = {
  createUser: async (_, { data }, pubSub, info) => {
    const newUser = new User({ userName: data.userName, projects: []});
    const error = await newUser.save();
    var result = await User.findById(newUser._id).populate({
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
    pubSub.publish('user', {
      user: {
        mutation: "CREATED",
        data: result
      }
    })

    if (error) return error
    return newUser.populate({
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
  },
  deleteUser: async (_, { id }, pubSub, info) => {
    await User.deleteOne({
      _id: id
    })
    pubSub.publish('user', {
      user: {
        mutation: "DELETED",
        data: {}
      }
    })
    return `userID: ${id} deleted!!`;
  },
  updateUser: async (_, { id, data }, pubSub, info) => {
    await User.updateOne(
      { _id: id },
      { $set: { "userName": data.userName } }
    )
    const userRet = User.findById(id).populate({
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
    pubSub.publish('user', {
      user: {
        mutation: "UPDATED",
        data: userRet
      }
    })
    return userRet
  },
  createProject: async (_, { data }, pubSub, info) => {
    const newProject = new Project({ projectName: data.projectName });
    const error = await newProject.save();
    if (error) console.log(error);
    await User.updateOne(
      { _id: data.userID },
      { $push: { projects: newProject._id } }
    )
    const userSubscript = await User.findById(data.userID).populate({
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
    })
    pubSub.publish('user', {
      user: {
        mutation: "UPDATED",
        data: userSubscript
      }
    })

    return newProject;
  },
  deleteProject: async (_, { userID, id }, pubSub, info) => {
    await Project.deleteOne({
      _id: id
    });
    await User.updateOne(
      { _id: userID },
      { "$pull": { "projects": {"_id": id} } }
    )
    const userSubscript = await User.findById(userID).populate({
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
    pubSub.publish('user', {
      user: {
        mutation: "UPDATED",
        data: userSubscript
      }
    })
    return `delete project id: ${id}`
  },
  updateProject: async (_, { userID, id, data }, pubSub, info) => {
    if (data.projectName) {
      await Project.updateOne({ _id: id },
        { $set: { "projectName": data.projectName } }
      )
    }
    if (data.links) {
      await Project.updateOne({ _id: id },
        {links: data.links })
    }
    const projectRet = Project.findById(id);
    const userSubscript = await User.findById(userID).populate({
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
    pubSub.publish('user', {
      user: {
        mutation: "UPDATED",
        data: userSubscript
      }
    })
    return projectRet
  },
  createAssignment: async (_, { userID, data }, pubSub, info) => {
    const project = Project.findById(data.projectID);
    const newAssignment = new Assignment({ assignmentName: data.assignmentName, projectName: project.projectName});
    const error = await newAssignment.save();
    if (error) console.log(error);
    await Project.updateOne(
      { _id: data.projectID },
      { $push: { "assignments": newAssignment._id } }
    )
    const userSubscript = await User.findById(userID).populate({
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
    pubSub.publish('user', {
      user: {
        mutation: "UPDATED",
        data: userSubscript
      }
    })
    return newAssignment;
  },
  deleteAssignment: async (_, { userID, id }, pubSub, info) => {
    await Assignment.deleteOne({
      _id: id
    })
    await Project.updateMany(
      {},
      { "$pull": { "assignments": {"_id": id} } }
    )
    const userSubscript = await User.findById(userID).populate({
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
    pubSub.publish('user', {
      user: {
        mutation: "UPDATED",
        data: userSubscript
      }
    })
    return `delete assignment id: ${id}`
  },
  updateAssignment: async (_, { userID, id, data }, pubSub, info) => {
    if (data.assignmentName) {
      await Assignment.updateOne({ _id: id },
        { $set: { "assignmentName": data.assignmentName } }
      )
    }
    if (data.deadline) {
      await Assignment.updateOne({ _id: id },
        { $set: { "deadline": data.deadline } }
      )
    }
    if (data.status) {
      await Assignment.updateOne({ _id: id },
        { $set: { "status": data.status } }
      )
    }
    if (data.isComplete !== undefined) {
      await Assignment.updateOne({ _id: id },
        { $set: { "isComplete": data.isComplete } }
      )
    }
    const assignmentRet = Assignment.findById(id);
    const userSubscript = await User.findById(userID).populate({
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
    pubSub.publish('user', {
      user: {
        mutation: "UPDATED",
        data: userSubscript
      }
    })
    return assignmentRet
  },
  createRecord: async (_, { userID, data }, pubSub, info) => {
    const newRecord = new Record({ startAt: data.startAt, duration: data.duration })
    const error = await newRecord.save();
    if (error) console.log(error);
    await Assignment.updateOne(
      { _id: data.assignmentID },
      { $push: { "records": newRecord._id } }
    )
    const userSubscript = await User.findById(userID).populate({
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
    pubSub.publish('user', {
      user: {
        mutation: "UPDATED",
        data: userSubscript
      }
    })
    return newRecord;
  },
  deleteRecord: async (_, { userID, id }, pubSub, info) => {
    await Record.deleteOne({
      _id: id
    })
    await Assignment.updateMany(
      {},
      { "$pull": { "records": {"_id": id} } }
    )
    const userSubscript = await User.findById(userID).populate({
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
    pubSub.publish('user', {
      user: {
        mutation: "UPDATED",
        data: userSubscript
      }
    })
    return `delete record id: ${id}`
  },
  updateRecord: async (_, { userID, id, data }, pubSub, info) => {
    if (data.startAt) {
      await Record.updateOne({ _id: id },
        { $set: { "startAt": data.startAt } }
      )
    }
    if (data.duration) {
      await Record.updateOne({ _id: id },
        { $set: { "duration": data.duration } }
      )
    }
    const recordRet = Record.findById(id);
    const userSubscript = await User.findById(userID).populate({
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
    pubSub.publish('user', {
      user: {
        mutation: "UPDATED",
        data: userSubscript
      }
    })
    return recordRet
  },
  clearCluster: async (_, __, pubSub, info) => {
    await Record.deleteMany({})
    await Assignment.deleteMany({})
    await Project.deleteMany({})
    await User.deleteMany({})
    return "Cluster are clean now~"
  }
}

module.exports = Mutation
