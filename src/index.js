const { ApolloServer } = require('apollo-server');

// Data link fake
let links = [
    {
        id: 'link-0',
        url: 'www.dominofake.com',
        description: 'Backend trainig for GraphQL'
    },
    {
        id: 'link-1',
        url: 'www.domino2fake.com',
        description: 'Backend trainig for GraphQL ejemplo link dos'
    }
]

// 1
const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`
// 2
const resolvers = {
  Query: {
    // 1
    info: () => `We are starting with the training`,
    // 2
    feed: () => links,
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}

// 3
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );