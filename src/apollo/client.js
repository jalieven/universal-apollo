import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

// import { defaults, resolvers /*typeDefs*/ } from "./localState.js";
import config from '../config';

const client = new ApolloClient({
	link: new HttpLink({ uri: config.gqlUri }),
	cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
	// clientState: {
	//   defaults,
	//   resolvers
	//   // typeDefs
	// }
});

export default client;
