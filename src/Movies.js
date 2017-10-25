import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    return axios.get('http://marvelus.me/api/movie?q=%7B"limit":9%7D').then(res=> {
      const movies = res.data.objects.map(movie => movie)
      this.setState({movies});
    });
  }
  
  render() {
    return (
      <div className="container" styles="margin-top:100px;">
        <div className="row">
          {this.state.movies.map(movie =>
            <div className="col-sm-4">
              <div className="panel panel-info">
                <div className="panel-heading"><Link to={"/movie/" + movie.id}>{movie.title}</Link></div>
                <div className="panel-body"><img src={"http://image.tmdb.org/t/p/w185/" + movie.poster_path} className="img-responsive" styles="width:100%" alt="Image" /></div>
                <div className="panel-footer">{movie.overview}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

}

export default Movies