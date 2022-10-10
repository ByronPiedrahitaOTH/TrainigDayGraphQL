const { ApolloServer } = require('apollo-server')
const path = require('path')
const fs = require('fs')

// Data link fake
let links = [
    {
        id: 'link-0',
        url: 'www.dominofake.com',
        description: 'Backend trainig for GraphQL'
    }
]

const resolvers = {
  Query: {
    info: () => `We are starting with the training`,
    feed: () => links,
  },
  Mutation: {
    createLink: (parent, args) => {
  
    let idCount = links.length

       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    }
  }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );