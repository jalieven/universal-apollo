import React from 'react'
import { Route, Switch } from 'react-router'
// import { ApolloProvider } from "react-apollo";

// import { client } from "./../apollo";
import LoadComponent from './universal'

const Home = LoadComponent('home')
const HeroAndFriends = LoadComponent('hero')

const Routes = () => (
  // <ApolloProvider client={client}>
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/episodes/:episode' component={HeroAndFriends} />
  </Switch>
  // </ApolloProvider>
)

export default Routes
