import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router';

import config from '../config';
import LoadComponent from '../utils/universal';

const Home = LoadComponent('routes/home');
const HeroAndFriends = LoadComponent('routes/hero');

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
