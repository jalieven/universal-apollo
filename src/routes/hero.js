import React, { Fragment } from 'react'
import get from 'lodash/get'
// import { Query } from "react-apollo";
// import gql from "graphql-tag";

// const QUERY = gql`
//   query HeroFriends($episode: Episode!) {
//     hero(episode: $episode) {
//       name
//       friends {
//         name
//       }
//     }
//   }
// `;

// const HeroAndFriends = ({ match }) => (
//   <Query query={QUERY} variables={{ episode: match.params.episode }}>
//     {({ data, error, loading }) => {
//       if (error) return "💩 Oops!";
//       if (loading) return "Patience young grasshopper...";

//       return (
//         <Fragment>
//           <h1>Hero: {data.hero.name}</h1>
//           <h2>His/her friends:</h2>
//           <ul>
//             {data.hero.friends.map(friend => (
//               <li key={friend.name}>{friend.name}</li>
//             ))}
//           </ul>
//         </Fragment>
//       );
//     }}
//   </Query>
// );

const bla = get({}, 'one')

const HeroAndFriends = () => <div>Hero</div>

export default HeroAndFriends
