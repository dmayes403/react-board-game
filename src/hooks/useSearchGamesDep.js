import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { useMemo } from 'react';

export const useSearchGames = ({
  searchText
}) => {
  const restLink = new RestLink({ uri: '' });
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink,
  })
  
  const SEARCH_GAMES = gql`
    query SearchGames($searchText: String!) {
      searchGames(
        searchText: $searchText
      ) @rest(
          type: "request"
          path: "https://api.boardgameatlas.com/api/search?name={args.searchText}&client_id=p110BjQB82"
          method: "GET",
        ) {
          response
        }
    }
  `;
  
  const { data, loading, error} = useQuery(SEARCH_GAMES, {
    client,
    variables: {
      searchText
    }
  });

  const games = useMemo(() => {
    console.log('data', data);
    return data?.games, [data]
  })

  return {
    games,
    loading,
    error
  }
}







// export const useSearchGames = (searchText) => {
//   const restLink = new RestLink({ uri: `https://api.boardgameatlas.com/api/search?name=${searchText}&client_id=p110BjQB82` });
  
//   const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: restLink,
//   })
  
//   const SEARCH_QUERY = gql`
//     query Games {
//       games @rest(type: "Game", path: "") {
//         games
//       }
//     }
//   `;

//   const {data, loading, error, refetch} = useQuery(SEARCH_QUERY);

//   return {
//     data,
//     loading,
//     error,
//     refetch
//   }
// }

// export default useSearchGames;
