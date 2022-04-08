const resolvers = {
    Query: {
      getSurveyTitle: async (_, { surveyId }, { dataSources }) => {
        const data = await dataSources.surveyApi.getSurveyTitle(surveyId);
        if (data.Items.length == 0 ) {
          return "";
        }
        return {surveyTitle: data.Items[0].title};
      },
      getSurveyResponses: (_, { surveyId }) => {
        return {surveyId};
      },
    },
    Responses: {
      surveyTitle: async ({surveyId}, _, { dataSources }) => {
        const data = await dataSources.surveyApi.getSurveyTitle(surveyId);
        if (data.Items.length == 0 ) {
          return "";
        }
        return data.Items[0].title;
      },
      responses:  async ({surveyId}, _, { dataSources }) => {
       const data = await dataSources.surveyApi.getSurveyResponses(surveyId);
       return data.Items;
       }
    }
  };
  module.exports = resolvers;