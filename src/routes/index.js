import React from 'react';
import { Route, Switch } from 'react-router';

import LoadComponent from './universal';

const Home = LoadComponent('home');
const HeroAndFriends = LoadComponent('hero');

const Routes = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/episodes/:episode" component={HeroAndFriends} />
	</Switch>
);

export default Routes;
