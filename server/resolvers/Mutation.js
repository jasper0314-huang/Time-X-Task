const Message = require('../models/message')

const Mutation = {
  createMessage: async (_, { from, to, body }, pubSub, info) => {
    const newMessage = new Message({ from: from, to: to, body: body });
    const error = await newMessage.save();
    pubSub.publish('message', {
      message: {
        mutation: "CREATED",
        data: newMessage
      }
    })

    if (error) return error
    return newMessage;
  },
  deleteMessage: async (_, { query }, pubSub, info) => {
    await Message.deleteMany({
      $or: [{ from: query }, { to: query }]
    });
    return `Message of ${query} deleted!!`;
  },
  deleteMessages: async (_, __, pubSub, info) => {
    await Message.deleteMany({});
    // pubSub.publish('message', {
    //   message: {
    //     mutation: "DELETED",
    //     data: newMessage
    //   }
    // })
    return "All Messages are deleted!!";
  }
}

module.exports = Mutation
