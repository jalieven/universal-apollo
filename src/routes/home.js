import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
	<div>
		<h2>Home</h2>
		<Link to="/episodes/EMPIRE">Empire episode</Link>
	</div>
);

export default Home;
