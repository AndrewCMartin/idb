import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

var imageStyles={
    height:'500px',
}


class Actors extends React.Component{
  constructor(props){
    super(props);
    this.state = {actors: []}
  }

  componentDidMount(){
    return axios.get('http://marvelus.me/api/actor?results_per_page=50').then(res=> {
      const actors = res.data.objects.map(actor => actor)
      this.setState({actors});
    });
  }

  render() {
    return(
      <div className="container" styles="margin-top:100px;">
          <div className="row">
              {this.state.actors.map(actor =>
                <div className="col-sm-4">
                  <div className="panel panel-info">
                    <div className="panel-heading"><Link to={"/actor/" + actor.id}>{actor.name}</Link></div>
				     <div className="panel-body"><img src={"https://image.tmdb.org/t/p/w640/" + actor.image} className="img-responsive" style={imageStyles} alt="Image" /></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
  }
}

export default Actors
