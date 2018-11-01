import React from 'react';
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
					<h1>{title}</h1>
					<h2>His/her friends:</h2>
					<ul>
						{data.hero.friends.map(friend => (
							<li key={friend.name}>{friend.name}</li>
						))}
					</ul>
					<Link to="/">Home</Link>
				</div>
			);
		}}
	</Query>
);

export default HeroAndFriends;
