const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

//const Post = require('./models/Post');
const { MONGODB } = require('./config.js');


const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`;

const resolvers = {
    Query: {
        sayHi: () => 'Hello World'
    }
};

// create a apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

//connect to mongodb server
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
  