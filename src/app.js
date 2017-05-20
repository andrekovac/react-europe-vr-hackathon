import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client'

import Query from './components/Query';

export default class ReactEuropeHackathon extends React.Component {
  createClient() {
    // Initialize Apollo Client with URL to our server
    return new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: 'http://api.githunt.com/graphql',
      }),
    });
  }

  render() {
    return (
      // Feed the client instance into your React component tree
      <ApolloProvider client={this.createClient()}>
        <Query />
      </ApolloProvider>
    );
  }
};
