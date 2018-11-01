import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import fetch from 'node-fetch'

// import { defaults, resolvers /*typeDefs*/ } from "./localState.js";
import config from '../config'

const server = new ApolloClient({
  link: new HttpLink({
    uri: config.gqlUri,
    fetch
  }),
  cache: new InMemoryCache()
  // clientState: {
  //   defaults,
  //   resolvers
  //   // typeDefs
  // }
})

export default server
