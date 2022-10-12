const { ApolloServer } = require('apollo-server')
const path = require('path')
const fs = require('fs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    info: () => `We are starting with the training`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    },
  },
  Mutation: {
    createLink: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      })
      return newLink
    },
  },
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
    context: {
      prisma,
    }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );