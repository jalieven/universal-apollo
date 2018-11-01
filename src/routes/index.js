import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router';

import config from '../config';
import LoadComponent from './universal';

const Home = LoadComponent('home');
const HeroAndFriends = LoadComponent('hero');

const Routes = () => (
	<Fragment>
		<Helmet>
			<link rel="dns-prefetch" href={config.gqlUri} />
		</Helmet>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/episodes/:episode" component={HeroAndFriends} />
		</Switch>
	</Fragment>
);

export default Routes;
