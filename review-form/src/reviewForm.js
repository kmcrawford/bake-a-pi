import React from "react";
import ReactStars from 'react-stars'
import './App.css';

class ReviewForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '', starRating: 0, title: '',sumbitEnabled: false, isLoaded: false, error: null, complete: false};
  
      this.handleChange = this.handleChange.bind(this);
      this.ratingChanged = this.ratingChanged.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
      const params = new URLSearchParams(window.location.search);
      const surveyId = parseInt(params.get('surveyId'));
      this.setState({isLoaded: false});
      fetch("https://api.spunkyrocket.com/bake-a-pi/review?surveyId="+surveyId)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          console.log(result.Items[0].title);
          this.setState({
            isLoaded: true,
            title: result.Items[0].title
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
      if (event.target.value.length >0 ) {
        this.setState({sumbitEnabled: true});
      } else {
        this.setState({sumbitEnabled: false});
      }
    }
  
    handleSubmit(event) {
      const params = new URLSearchParams(window.location.search);
      const surveyId = parseInt(params.get('surveyId'));
      const data = { surveyId, starRating:this.state.starRating,review:this.state.value};
      fetch("https://api.spunkyrocket.com/bake-a-pi/reviews", 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.setState({complete:true})
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      event.preventDefault();
    }
    ratingChanged(newRating){
        this.setState({starRating: newRating});
        console.log(newRating)
    }
  
    render() {
      if (!this.state.isLoaded) {
        return <div>Loading...</div>;
      } else if (this.state.complete) {
        return <div>Thank you!</div>;
      } else {
        return (
          <form onSubmit={this.handleSubmit}>

             <div className="container">
               <div className="item">{this.state.title}</div>
               <div className="item">
                <ReactStars
                        className="item"
                        count={5}
                        onChange={this.ratingChanged}
                        size={24}
                        half={false}
                        value={this.state.starRating}
                        color2={'#ffd700'} />
              </div>
              <div className="item">
              Comments:
              </div>
              <div>
                  <input type="text" size="50"  maxLength="50" value={this.state.value} onChange={this.handleChange} />
              </div>
              <div className="item"> 
                <input className="button-9" type="submit" value="Submit" disabled={!this.state.sumbitEnabled}/>
              </div>
              </div>
          </form>
      
        );
      }
    }
  }
  export default ReviewForm;