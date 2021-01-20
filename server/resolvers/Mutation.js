const User = require('../models/user')
const Project = require('../models/project')
const Assignment = require('../models/assignment')
const Record = require('../models/record')


const Mutation = {
  createUser: async (_, { data }, pubSub, info) => {
    const newUser = new User({ userName: data.userName, projects: []});
    const error = await newUser.save();
    pubSub.publish('user', {
      user: {
        mutation: "CREATED",
        data: newUser
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
    if (id) {
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
    } else {
      await User.deleteMany();
      pubSub.publish('user', {
        user: {
          mutation: "DELETED",
          data: {}
        }
      })
      return `Delete all Users`
    }
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
    // console.log(newProject);
    // console.log(newProject._id);
    await User.updateOne(
      { _id: data.userID },
      { $push: { projects: newProject._id } }
    )
    // pubSub.publish('user', {
    //   project: {
    //     mutation: "CREATED",
    //     data: newProject
    //   }
    // })

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
      // pubSub.publish('project', {
      //   project: {
      //     mutation: "DELETED",
      //     data: {}
      //   }
      // })
      return `delete project id: ${id}`
    } else {
      return `No projectID input`
    }
  },
  updateProject: async (_, { id, data }, pubSub, info) => {
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

    // pubSub.publish('project', {
    //   project: {
    //     mutation: "UPDATED",
    //     data: projectRet
    //   }
    // })
    return projectRet
  },
  createAssignment: async (_, { data }, pubSub, info) => {
    const project = Project.findById(data.projectID);
    const newAssignment = new Assignment({ assignmentName: data.assignmentName, projectName: project.projectName});
    const error = await newAssignment.save();
    if (error) console.log(error);
    await Project.updateOne(
      { _id: data.projectID },
      { $push: { "assignments": newAssignment._id } }
    )

    // pubSub.publish('assignment', {
    //   assignment: {
    //     mutation: "CREATED",
    //     data: newAssignment
    //   }
    // })

    return newAssignment;
  },
  deleteAssignment: async (_, { id }, pubSub, info) => {
    if (id) {
      await Assignment.deleteOne({
        _id: id
      })
      await Project.updateMany(
        {},
        { "$pull": { "assignments": {"_id": id} } }
      )

      // pubSub.publish('assignment', {
      //   assignment: {
      //     mutation: "DELETED",
      //     data: {}
      //   }
      // })
      return `delete assignment id: ${id}`
    } else {
      // await Assignment.deleteMany();
      return `No assignment id input`
    }
  }, // can't delete assignment since the time record should be preserve
  updateAssignment: async (_, { id, data }, pubSub, info) => {
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
    // pubSub.publish('assignment', {
    //   project: {
    //     mutation: "UPDATED",
    //     data: assignmentRet
    //   }
    // })
    return assignmentRet
  },
  createRecord: async (_, { data }, pubSub, info) => {
    const newRecord = new Record({ startAt: data.startAt, duration: data.duration })
    const error = await newRecord.save();
    if (error) console.log(error);
    await Assignment.updateOne(
      { _id: data.assignmentID },
      { $push: { "records": newRecord._id } }
    )
    return newRecord;
  },
  deleteRecord: async (_, { id }, pubSub, info) => {
    if (id) {
      await Record.deleteOne({
        _id: id
      })
      await Assignment.updateMany(
        {},
        { "$pull": { "records": {"_id": id} } }
      )
      return `delete record id: ${id}`
    } else {
      return `No record id input`
    }
  }, // can't delete assignment since the time record should be preserve
  updateRecord: async (_, { id, data }, pubSub, info) => {
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
  
    const recoreRet = Record.findById(id);
    return recoreRet
  }
}

module.exports = Mutation
