import './App.css';
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';

// construct our main Graphql endpoint
const httpLink = createHttpLink({
  uri: 'graphql',
});
// construct request middleware that will attach the token to the headers
const authlink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };

  });

  const client = new ApolloClient({
    link: authlink.concat(httpLink),
    cache: new InMemoryCache(),
    
  });



function App() {
  return (
    <ApolloProvider client={client}>
    <>
      <Navbar />
      <Outlet />
    </>
    </ApolloProvider>
  );
}

export default App;
