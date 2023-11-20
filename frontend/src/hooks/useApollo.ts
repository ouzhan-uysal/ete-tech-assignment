import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BASEURL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const jwt = Cookies.get('ete-token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: jwt ? `Bearer ${jwt}` : '',
    },
  };
});

const useApollo = () => {
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });

  const QueryRequest = async (query: string) => {
    return await apolloClient.query({
      query: gql`
				${query}
			`,
    });
  };

  const MutationRequest = async (query: string) => {
    return await apolloClient.mutate({
      mutation: gql`
				${query}
			`,
    });
  };

  return { QueryRequest, MutationRequest };
};

export default useApollo;
