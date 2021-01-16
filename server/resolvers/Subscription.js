// const Message = require('../models/message')

const Subscription = {
  message: {
    // subscribe: () => pubsub.asyncIterator('getMessage')
    subscribe(parent, args, pubSub , info) {
      // console.log(pubSub);
      return pubSub.asyncIterator('message');
    }
  }
}
module.exports = Subscription