import React, { useState, useEffect } from 'react';
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

const toggleComponent = (component, setComponent) => e => setComponent(component + 1);

const Home = ({ style }) => {
	const [component, setComponent] = useState(1);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		fetch('https://api.github.com/users')
			.then(response => response.json())
			.then(data => setUsers(data));
	}, []);
	const chars =
		'De campagnevideo van de Amerikaanse president Donald Trump zal niet te zien zijn op CNN. Volgens de nieuwszender is het filmpje racistisch en feitelijk onjuist.';
	return (
		<Fill style={style}>
			<Helmet title="Home" />
			<Title>Home</Title>
			<span>{chars}</span>
			<Button onClick={toggleComponent(component, setComponent)}>
				<FormattedMessage
					id="button.toggle.component"
					defaultMessage="Load {name}"
					description="Text for the load component async button"
					values={{ name: 'Component' }}
				/>
			</Button>
			{component % 2 === 1 ? <Title>First</Title> : <Test />}
			<Link to="/films/EMPIRE">The Empire Strikes back</Link>
			<div>
				{users.map(user => (
					<div key={user.id}>
						<span>{user.login}</span>
					</div>
				))}
			</div>
		</Fill>
	);
};

export default Home;
