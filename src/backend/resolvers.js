const posts = [{id: 1, title: 'abc'}, {id: 2, title: 'ddd'}, {id: 3, title: 'fff'}];

export const resolvers = {
  Query: {
    posts:  (root, args, context) => {
      return posts;
    }
  }
}
