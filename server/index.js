require('dotenv-defaults').config()
const { GraphQLServer, PubSub } = require('graphql-yoga')
const mongoose = require('mongoose')

const pubsub = new PubSub()
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription
  },
  context: pubsub

})

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  // const PORT = process.env.SERVER_PORT || 4200
  const PORT = 4200

  console.log('MongoDB connected!')
  server.start({ port: PORT }, () => {
    console.log(`The server is up on port ${PORT}!`)
  })
})
