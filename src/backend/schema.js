import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
type Post {
  id: ID!
  title: String
}

type Query {
  posts: [Post]
}
`;


const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
