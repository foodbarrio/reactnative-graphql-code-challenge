/**
 * Apollo server setup
 */

const {ApolloServer} = require('apollo-server');
const typeDefs = require('./src/schema.js');
const resolvers = require('./src/resolvers.js');
const db = require("knex")(
  require("./knexfile.js")["development"]
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({db}),
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({url}) => {
  console.log(`Server ready at ${url}`);
});
