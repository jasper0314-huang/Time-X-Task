const User = require('../models/user')
const Project = require('../models/project')
const Assignment = require('../models/assignment')

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
    return newUser;
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
    pubSub.publish('user', {
      user: {
        mutation: "UPDATED",
        data: {}
      }
    })
  },
  createProject: async (_, { data }, pubSub, info) => {
    const newProject = new Project({ projectName: data.projectName });
    const error = await newProject.save();
    if (error) console.log(error);
    await User.updateOne(
      { _id: data.userID },
      { $push: { projects: newProject } }
    )
    pubSub.publish('project', {
      project: {
        mutation: "CREATED",
        data: newProject
      }
    })

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
      pubSub.publish('project', {
        project: {
          mutation: "DELETED",
          data: {}
        }
      })
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
      await User.updateMany(
        { "projects._id": id },
        { $set: { "projects.$.projectName": data.projectName } }
      )
    }
    if (data.links) {
      await Project.updateOne({ _id: id },
        {links: data.links })
      await User.updateMany(
        { "projects._id": id },
        { $set: { "projects.$.links": data.links } }
      )
    }

    pubSub.publish('project', {
      project: {
        mutation: "UPDATED",
        data: {}
      }
    })
  },
  createAssignment: async (_, { data }, pubSub, info) => {
    const newAssignment = new Assignment({ assignmentName: data.assignmentName });
    const error = await newAssignment.save();
    if (error) console.log(error);
    await Project.updateOne(
      { _id: data.projectID },
      { $push: { "assignments": newAssignment } }
    )
    await User.updateOne(
      { _id: data.userID, "projects._id": data.projectID },
      { $push: {
        "projects.$.assignments": newAssignment
      } } 
    )

    pubSub.publish('assignment', {
      assignment: {
        mutation: "CREATED",
        data: newAssignment
      }
    })

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

      pubSub.publish('assignment', {
        assignment: {
          mutation: "DELETED",
          data: {}
        }
      })
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
      await Project.updateMany(
        { "assignments._id": id },
        { $set: { "assignments.$.assignmentName": data.assignmentName } }
      )
      await User.updateMany(
        {},
        { $set: { "projects.$[].assignments.$[a].assignmentName": data.assignmentName } },
        { arrayFilters: [{ "a._id": id }] }
      )
    }
    if (data.deadline) {
      await Assignment.updateOne({ _id: id },
        { $set: { "deadline": data.deadline } }
      )
      await Project.updateMany(
        { "assignments._id": id },
        { $set: { "assignments.$.deadline": data.deadline } }
      )
      await User.updateMany(
        {},
        { $set: { "projects.$[].assignments.$[a].deadline": data.deadline } },
        { arrayFilters: [{ "a._id": id }] }
      )
    }
    if (data.status) {
      await Assignment.updateOne({ _id: id },
        { $set: { "status": data.status } }
      )
      await Project.updateMany(
        { "assignments._id": id },
        { $set: { "assignments.$.status": data.status } }
      )
      await User.updateMany(
        {},
        { $set: { "projects.$[].assignments.$[a].status": data.status } },
        { arrayFilters: [{ "a._id": id }] }
      )
    }
    if (data.isComplete) {
      await Assignment.updateOne({ _id: id },
        { $set: { "isComplete": data.isComplete } }
      )
      await Project.updateMany(
        { "assignments._id": id },
        { $set: { "assignments.$.isComplete": data.isComplete } }
      )
      await User.updateMany(
        {},
        { $set: { "projects.$[].assignments.$[a].isComplete": data.isComplete } },
        { arrayFilters: [{ "a._id": id }] }
      )
    }

    pubSub.publish('assignment', {
      project: {
        mutation: "UPDATED",
        data: {}
      }
    })
  },
  

  // createRecord: async (_, { data }, pubSub, info) => {
  //   const newRecord = new Record({ assignmentName: data.assignmentName });
  //   const error = await newRecord.save();
  //   if (error) console.log(error);
  //   await Project.updateOne(
  //     { _id: data.projectID },
  //     { $push: { "assignments": newRecord } }
  //   )
  //   await User.updateOne(
  //     { _id: data.userID, "projects._id": data.projectID },
  //     { $push: {
  //       "projects.$.assignments": newRecord
  //     } } 
  //   )

  //   pubSub.publish('assignment', {
  //     assignment: {
  //       mutation: "CREATED",
  //       data: newRecord
  //     }
  //   })

  //   return newRecord;
  // },
  // deleteRecord: async (_, { id }, pubSub, info) => {
  //   if (id) {
  //     await Record.deleteOne({
  //       _id: id
  //     })
  //     await User.updateMany(
  //       {},
  //       { "$pull": { "projects.$[].assignments": {"_id": id} } }
  //     )
  //     await Project.updateMany(
  //       {},
  //       { "$pull": { "assignments": {"_id": id} } }
  //     )

  //     pubSub.publish('assignment', {
  //       assignment: {
  //         mutation: "DELETED",
  //         data: {}
  //       }
  //     })
  //     return `delete assignment id: ${id}`
  //   } else {
  //     // await Record.deleteMany();
  //     return `No assignment id input`
  //   }
  // }, // can't delete assignment since the time record should be preserve
  // updateRecord: async (_, { id, data }, pubSub, info) => {
  //   if (data.assignmentName) {
  //     await Record.updateOne({ _id: id },
  //       { $set: { "assignmentName": data.assignmentName } }
  //     )
  //     await Project.updateMany(
  //       { "assignments._id": id },
  //       { $set: { "assignments.$.assignmentName": data.assignmentName } }
  //     )
  //     await User.updateMany(
  //       {},
  //       { $set: { "projects.$[].assignments.$[a].assignmentName": data.assignmentName } },
  //       { arrayFilters: [{ "a._id": id }] }
  //     )
  //   }
  //   if (data.deadline) {
  //     await Record.updateOne({ _id: id },
  //       { $set: { "deadline": data.deadline } }
  //     )
  //     await Project.updateMany(
  //       { "assignments._id": id },
  //       { $set: { "assignments.$.deadline": data.deadline } }
  //     )
  //     await User.updateMany(
  //       {},
  //       { $set: { "projects.$[].assignments.$[a].deadline": data.deadline } },
  //       { arrayFilters: [{ "a._id": id }] }
  //     )
  //   }
  //   if (data.status) {
  //     await Record.updateOne({ _id: id },
  //       { $set: { "status": data.status } }
  //     )
  //     await Project.updateMany(
  //       { "assignments._id": id },
  //       { $set: { "assignments.$.status": data.status } }
  //     )
  //     await User.updateMany(
  //       {},
  //       { $set: { "projects.$[].assignments.$[a].status": data.status } },
  //       { arrayFilters: [{ "a._id": id }] }
  //     )
  //   }
  //   if (data.isComplete) {
  //     await Record.updateOne({ _id: id },
  //       { $set: { "isComplete": data.isComplete } }
  //     )
  //     await Project.updateMany(
  //       { "assignments._id": id },
  //       { $set: { "assignments.$.isComplete": data.isComplete } }
  //     )
  //     await User.updateMany(
  //       {},
  //       { $set: { "projects.$[].assignments.$[a].isComplete": data.isComplete } },
  //       { arrayFilters: [{ "a._id": id }] }
  //     )
  //   }

  //   pubSub.publish('assignment', {
  //     project: {
  //       mutation: "UPDATED",
  //       data: {}
  //     }
  //   })
  // },






}

module.exports = Mutation
