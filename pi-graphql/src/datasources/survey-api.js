const { RESTDataSource } = require('apollo-datasource-rest');

class SurveyApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spunkyrocket.com/bake-a-pi';
  }

  getSurveyTitle(surveyId){
    return this.get(`/review?surveyId=${surveyId}`, {}, {cacheOptions: { ttl: 5000 }});
  }
  
  getSurveyResponses(surveyId) {
    return this.get(`/reviews?surveyId=${surveyId}`, {}, {cacheOptions: { ttl: 2 }});
  }
}
module.exports = SurveyApi;