const { gql } = require('apollo-server');

const typeDefs = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
  scalar _FieldSet

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  directive @key(fields: _FieldSet!) repeatable on OBJECT | INTERFACE

  type Query {
    "Fetch survey title"
    getSurveyTitle(surveyId: Int!): SurveyTitle!
    
    "Fetch answers to Survey by SurveyId"
    getSurveyResponses(surveyId: Int!): Responses!
  }

  "SurveyTitle"
  type SurveyTitle @cacheControl(inheritMaxAge: true)  {
   surveyTitle: String!
  }

  "Responses"
  type Responses @cacheControl(inheritMaxAge: true) {
    surveyTitle: String!
    responses: [Response]!
  }
  "Response"
  type Response @cacheControl(inheritMaxAge: true) {
    starRating: Int
    review: String
  }
`;

module.exports = typeDefs;