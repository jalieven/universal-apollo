import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import styled from 'react-emotion';
import { Transition } from 'react-spring';
import gql from 'graphql-tag';
import first from 'lodash/first';
import map from 'lodash/map';

import styles from '../styles/general';

const Fill = styled('div')(styles.fill);

const QUERY = gql`
	query AllFilms($film: String!) {
		allFilms(filter: { title_contains: $film }) {
			title
			characters {
				id
				name
			}
		}
	}
`;

const Film = ({ match, characters, title }) => (
	<Fragment>
		<Helmet>
			<title>Film</title>
			<meta name="description" content={title} />
		</Helmet>
		<h1>{title}</h1>
		<h2>Characters:</h2>
		<ul>
			{map(characters, character => (
				<li key={character.id}>{character.name}</li>
			))}
		</ul>
		<Link to="/">Home</Link>
		<Link to="/films/JEDI">Return of the Jedi</Link>
		<Link to="/films/HOPE">A New Hope</Link>
		<Link to="/films/EMPIRE">The Empire Strikes Back</Link>
	</Fragment>
);

const FilmAndCharacter = ({ match, style }) => (
	<Fill style={style}>
		<Query query={QUERY} variables={{ film: match.params.film }}>
			{({ data, error, loading }) => {
				if (error) return '💩 Oops!';
				if (loading) return 'Patience young grasshopper...';
				const film = first(data.allFilms);
				const title = `Film: ${film.title}`;
				return <Film match={match} characters={film.characters} title={title} />;
			}}
		</Query>
	</Fill>
);

export default FilmAndCharacter;
