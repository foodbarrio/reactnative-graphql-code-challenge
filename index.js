const {ApolloServer} = require('apollo-server');
const typeDefs = require('./src/schema.js');
const database = require("knex")(
  require("./knexfile.js")["development"]
);

const server = new ApolloServer({typeDefs});

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`);
});
