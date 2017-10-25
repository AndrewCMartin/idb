import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

class Actors extends React.Component{
  constructor(props){
    super(props);
    this.state = {actors: []}
  }

  componentDidMount(){
    return axios.get('http://marvelus.me/api/actor?q=%7B%22limit%22:9%7D').then(res=> {
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
                    <div className="panel-body"><img src={"https://image.tmdb.org/t/p/w640/" + actor.image} className="img-responsive" styles="width:100% height:100%" alt="Image" /></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
  }
}

export default Actors