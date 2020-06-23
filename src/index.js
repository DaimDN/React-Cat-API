import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}
from 'react-router-dom';


class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://cat-fact.herokuapp.com/facts/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.all

          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <div className="jumbotron bg-dark text-white">
          <h1 className="text-center display-2"> FACTS ABOUT CATS</h1>
        </div>
       
        <div className="row container mx-auto">


        {items.map((value, index)=>{
            return <div key={index} className="col-xl-4 ">
            
            <div className="jumbotron bg-dark text-white " >
            <h4>Fact No : {index + 1}</h4>
            <h5></h5>
            <p>{value.text} </p> 
            
            </div>
            
            
            </div>
          })}
          
        </div>
          
          
        </div>
      );
     
    }
  }
}
       
ReactDOM.render(<MyComponent/>, document.getElementById('root'));