import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

class Events extends React.Component{
  constructor(props){
    super(props);
    this.state = {events: []}
  }

  componentDidMount(){
    return axios.get('http://marvelus.me/api/event?results_per_page=50&q={"filters":[{"name":"thumbnail","op":"is_not_null"}]}').then(res=> {
      const events = res.data.objects.map(event => event)
      this.setState({events});
    });
  }

  render() {
    return(
      <div className="container" styles="margin-top:100px;">
          <div className="row">
              {this.state.events.map(event =>
                <div className="col-sm-4">
                  <div className="panel panel-info">
                    <div className="panel-heading"><Link to={"/event/" + event.id}>{event.title}</Link></div>
                    <div className="panel-body"><img src={event.thumbnail} className="img-responsive" styles="width:100%" alt="Image" /></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
  }
}

export default Events
