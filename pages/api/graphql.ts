import { ApolloServer } from '@apollo/server'
import resolvers from 'apollo/resolvers/resolvers'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from 'apollo/typedefs/typedefs'
// import Cors from 'micro-cors'

// const cors = Cors()

const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} = require('@apollo/server/plugin/landingPage/default')

/* const corsOptions = {
  origin: process.env.GRAPHQL_URL,
  credentials: false
} */

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cors: corsOptions,
  csrfPrevention: true,
  cache: 'bounded',
  /**
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
  **/
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    // ApolloServerPluginLandingPageProductionDefault({ embed: true })
  ],
})

// The `listen` method launches a web server.
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
})

export default () => {}
//exports.handler = apolloServer.createHandler()({ path: '/api/graphql' })

// module.exports = apolloServer.start().then(() => apolloServer.createHandler({ path: '/api/graphql' }))

