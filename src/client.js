import ApolloClient, { createNetworkInterface } from 'apollo-client'
const networkInterface = createNetworkInterface({
  uri: 'https://www.react-europe.org/graphiql-private-bn7o0d1c',
  dataIdFromObject: record => record.id,
});
export const client = new ApolloClient({
  networkInterface,
});
