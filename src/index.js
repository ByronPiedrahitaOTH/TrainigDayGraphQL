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
    // 1
    createLink: (parent, args) => {
  
    let idCount = links.length

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    // 2
    deleteLink: (parent, args) => {
  
      let dataWithoutLink = links.filter(link => link.id !== args.id)
      links = dataWithoutLink
      return links

    },
    updateLink:(parent, args) =>{
      for (i=0;i<links.length;i++){
        if(links[i].id === args.id){
          links[i].description = args.description
          links[i].url = args.url
          return links[i]
        }
      }
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