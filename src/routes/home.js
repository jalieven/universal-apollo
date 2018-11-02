import React from 'react';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

import LoadComponent from '../utils/universal';

const Test = LoadComponent('components/test');

const Title = styled('h2')`
	color: hotpink;
`;

const Button = styled('button')`
	color: red;
`;

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			component: 1,
		};
		this.toggleComponent = this.toggleComponent.bind(this);
	}

	toggleComponent() {
		const { component } = this.state;
		this.setState({ component: component + 1 });
	}

	renderSubComponent() {
		const { component } = this.state;
		if (component % 2 === 1) {
			return <div>First</div>;
		}
		return <Test />;
	}

	render() {
		return (
			<div>
				<Helmet>
					<title>Home</title>
				</Helmet>
				<Title>Home</Title>
				<Button onClick={this.toggleComponent}>Load component</Button>
				{this.renderSubComponent()}
				<Link to="/episodes/EMPIRE">Empire episode</Link>
			</div>
		);
	}
}

export default Home;
