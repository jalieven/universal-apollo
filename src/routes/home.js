import React from 'react';
import Helmet from 'react-helmet';
// import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

const hotPink = css`
	color: hotpink;
`;
// const Title = styled('h2')`
// 	color: hotpink;
// `;

const Home = () => (
	<div>
		<Helmet>
			<title>Home</title>
		</Helmet>
		<h2 className={hotPink}>Home</h2>
		{/* <Title>Home</Title> */}
		<Link to="/episodes/EMPIRE">Empire episode</Link>
	</div>
);

export default Home;
