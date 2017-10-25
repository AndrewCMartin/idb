import React from 'react'
import { Link } from 'react-router-dom'

export default class Movies extends React.Component{
  constructor(props){
    super(props);
    this.state = {movies: []}
  }

  componentDidMount(){
    $.getJSON(document.location.origin + '/api/movie/' + this.id)
        .then((data) => {
          this.setState({loaded: true, movie:data}):
        }):
  }

  render() {
    const movies = this.state.movies.map((item,i) => {
      return(
        <div key = {item.id} className="item col-xs-6 col-lg-4">
          <div className="card thumbnail">
            <div className="card-img center-cropped"
                 style={{backgroundImage: 'url(' + item.image_url + ')'}}/>
            <div className="caption">
                 <h4 className="group inner list-group-item-heading">{item.name}</h4>
            </div>
          </div>
        </div>

        );
    });
    return(
      <div>
        <div className="container">
            <div id="movies" className="row list-group">
              { movies }
            </div>
        </div>

      </div>
      );
    
  }
}