import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './hero.styl';

const QUERY = gql`
	query HeroFriends($episode: Episode!) {
		hero(episode: $episode) {
			name
			friends {
				name
			}
		}
	}
`;

const HeroAndFriends = ({ match }) => (
	<Query query={QUERY} variables={{ episode: match.params.episode }}>
		{({ data, error, loading }) => {
			if (error) return '💩 Oops!';
			if (loading) return 'Patience young grasshopper...';
			const title = `Hero: ${data.hero.name}`;
			return (
				<div className={styles.hero}>
					<Helmet>
						<title>Hero</title>
						<meta name="description" content={match.params.episode} />
					</Helmet>
					<h1>{title}</h1>
					<h2>His/her friends:</h2>
					<ul>
						{data.hero.friends.map(friend => (
							<li key={friend.name}>{friend.name}</li>
						))}
					</ul>
					<Link to="/">Home</Link>
					<Link to="/episodes/JEDI">Jedi</Link>
					<Link to="/episodes/NEWHOPE">New Hope</Link>
					<Link to="/episodes/EMPIRE">Empire</Link>
				</div>
			);
		}}
	</Query>
);

export default HeroAndFriends;
