import React from 'react';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

const Title = styled('h2')`
	color: hotpink;
`;

const Home = () => (
	<div>
		<Helmet>
			<title>Home</title>
		</Helmet>
		<Title>Home</Title>
		<Link to="/episodes/EMPIRE">Empire episode</Link>
	</div>
);

export default Home;
