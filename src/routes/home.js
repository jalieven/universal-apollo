import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => (
	<div>
		<Helmet>
			<title>Home</title>
		</Helmet>
		<h2>Home</h2>
		<Link to="/episodes/EMPIRE">Empire episode</Link>
	</div>
);

export default Home;
