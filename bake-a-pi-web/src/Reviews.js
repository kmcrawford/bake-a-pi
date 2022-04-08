import React from "react";
import "./App.css";
import CountUp from "react-countup";
import TextTransition, { presets } from "react-text-transition";
import ReactStars from "react-rating-stars-component";


const getTextResponses = (responses) => {
    const textResponses = responses.map(response => response.review);
    return textResponses;
};
const renderResponseCount = (responses) => {
    return (
        <div className="stars-item">
            <div >
            Total Reviews: <CountUp end={responses.length} preserveValue={true} duration={1} />
            </div>
        </div>
        );
};
const getStarAverage = (responses) => {
    return (
        responses.reduce((acc, rating) => acc + parseFloat(rating.starRating), 0) /
        responses.length
    );
};
const renderStarAverage = (responses) => {
    const average = getStarAverage(responses);  
    return (
        <div className="stars-item">
            <div className="item">
            <ReactStars
                count={5}
                value={average}
                edit={false}
                isHalf={true}
                size={24}
                activeColor="#ffd700"
                key={average}
            />
            </div>
            <div className="item">
                <CountUp end={average} decimals={2} preserveValue={true} duration={1} />
                 &nbsp;(Avg)
            </div>
        </div>
    );
};

function Reviews(props) {
    const answers = getTextResponses(props.surveyResponses);
    const [index, setIndex] = React.useState(0);
    React.useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            3000 // every 3 seconds
        );
        return () => clearTimeout(intervalId);  
    }, []);
    if (index > answers.length) {
        setIndex(0);
    }
    return (
        <div className="App">
            {props.title}
            <div className="review">
                <div className="stars-container"> 
                    {renderResponseCount(props.surveyResponses)}
                    {renderStarAverage(props.surveyResponses)}
                </div>
                <div className="container"> 
                    <div className="item">
                        <TextTransition
                            text={answers[index ]}
                            springConfig={presets.molasses}
                        />
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default Reviews;
