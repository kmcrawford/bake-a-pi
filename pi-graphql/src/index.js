const { ApolloServer } = require('apollo-server');
const responseCachePlugin = require('apollo-server-plugin-response-cache');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const SurveyApi = require('./datasources/survey-api');


// set up any dataSources our resolvers need
const dataSources = () => ({
    surveyApi: new SurveyApi(),
});


// Set up Apollo Server
const server = new ApolloServer({
  plugins: [responseCachePlugin.default()],
  typeDefs,
  resolvers,
  dataSources
});


server.listen().then(() => {
    console.log(`
        Server is running!
        Listening on port 4000
        Explore at https://studio.apollographql.com/sandbox
    `);
});
