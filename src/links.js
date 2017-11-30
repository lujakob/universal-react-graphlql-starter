import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

export const getHttpLink = (apiHost) => {
  return new HttpLink({
    fetch,
    uri: `${apiHost}/graphql`,
  })
}