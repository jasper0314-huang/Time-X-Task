// const User = require('../models/user')
// const Project = require('../models/project')
// const Assignment = require('../models/assignment')

const Subscription = {
  user: {
    // subscribe: () => pubsub.asyncIterator('getMessage')
    subscribe(parent, args, pubSub, info) {
      // console.log(pubSub);
      return pubSub.asyncIterator('user');
    }
  },
  project: {
    subscribe(parent, args, pubSub, info) {
      return pubSub.asyncIterator('project');
    }
  },
  assignment: {
    subscribe(parent, args, pubSub, info) {
      return pubSub.asyncIterator('assignment');
    }
  }
}

module.exports = Subscription