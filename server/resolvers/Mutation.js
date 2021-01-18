const User = require('../models/user')
const Project = require('../models/project')
const Assignment = require('../models/assignment')

const Mutation = {
    createUser: async (_, data, pubSub, info) => {
    console.log("==============")
    console.log(data.userName)
    // const newUser = new User({ userName: data.userName });
    // const error = await newUser.save();
    // // pubSub.publish('message', {
    // //   message: {
    // //     mutation: "CREATED",
    // //     data: newUser
    // //   }
    // // })

    // if (error) return error
    // return newUser;
  }
//   deleteMessage: async (_, { query }, pubSub, info) => {
//     await Message.deleteMany({
//       $or: [{ from: query }, { to: query }]
//     });
//     return `Message of ${query} deleted!!`;
//   },
//   deleteMessages: async (_, __, pubSub, info) => {
//     await Message.deleteMany({});
//     // pubSub.publish('message', {
//     //   message: {
//     //     mutation: "DELETED",
//     //     data: newMessage
//     //   }
//     // })
//     return "All Messages are deleted!!";
//   }
}

module.exports = Mutation
