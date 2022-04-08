import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css";
import Reviews from "./Reviews"


const SURVEY_RESPONSES = gql`
query GetSurveyResponses($surveyId: Int!) {
    getSurveyResponses(surveyId: $surveyId) {
      surveyTitle
      responses {
        starRating
        review
      }
    }
  }
`;



function App() {
    const params = new URLSearchParams(window.location.search);
    const surveyId = parseInt(params.get('surveyId'));
    const { loading, error, data } = useQuery(SURVEY_RESPONSES, {
        variables: { surveyId },
        pollInterval: 1000,
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data.getSurveyResponses.responses.length == 0) return (
        <div className="App">
            <header className="App-header">
                No Data Yet! :(
            </header>
        </div>
    )
    return (
        <Reviews 
        title={data.getSurveyResponses.surveyTitle}
        surveyResponses={data.getSurveyResponses.responses} 
        />
    )
}

export default App;
