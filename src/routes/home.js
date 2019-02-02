import React from 'react';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import LoadComponent from '../utils/universal';
import styles from '../styles/general';

const Test = LoadComponent('components/test');

const Title = styled('h2')(props => ({
	color: props.theme.primaryColor,
}));

const Button = styled('button')({
	color: 'red',
});

const Fill = styled('div')(styles.fill);

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
			return <Title>First</Title>;
		}
		return <Test />;
	}

	render() {
		const { style } = this.props;
		const chars =
			'Een campagnevideo van de Amerikaanse president Donald Trump zal niet te zien zijn op CNN. Volgens de nieuwszender is het filmpje racistisch en feitelijk onjuist.';
		return (
			<Fill style={style}>
				<Helmet>
					<title>Home</title>
				</Helmet>
				<Title>Home</Title>
				<span>{chars}</span>
				<Button onClick={this.toggleComponent}>
					<FormattedMessage
						id="button.toggle.component"
						defaultMessage="Load {name}"
						description="Text for the load component async button"
						values={{ name: 'Component' }}
					/>
				</Button>
				{this.renderSubComponent()}
				<Link to="/films/EMPIRE">The Empire Strikes back</Link>
			</Fill>
		);
	}
}

export default Home;
