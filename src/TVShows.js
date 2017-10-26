import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

var imageStyles={
    width: '500px',
    height:'450px'
}
class TVShows extends React.Component{
  constructor(props){
    super(props);
    this.state = {tvshows: []}
  }

  componentDidMount(){
    return axios.get('http://marvelus.me/api/tv_show?q=%7B%22limit%22:9%7D').then(res=> {
      const tvshows = res.data.objects.map(tv_show => tv_show)
      this.setState({tvshows});
    });
  }

  render() {
    return(
      <div className="container" styles="margin-top:100px;">
          <div className="row">
              {this.state.tvshows.map(tv_show =>
                <div className="col-sm-4">
                  <div className="panel panel-info">
                    <div className="panel-heading"><Link to={"/tvshow/" + tv_show.id}>{tv_show.name}</Link></div>
				      <div className="panel-body"><img src={"http://image.tmdb.org/t/p/w500/" + tv_show.poster_path} className="img-responsive" style={imageStyles} alt="Image" /></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
  }
}

export default TVShows
