const Message = require('../models/message')
const Query = {
  async messages(parent, args, content, info) {
    // if (!args.query) {
    //   // return await Message.find({})
    // } else {
      var result = await Message.find({
        $or: [
          { from: args.query }, { to: args.query }
        ]
      })
      return result
    // }
  }
}

module.exports = Query