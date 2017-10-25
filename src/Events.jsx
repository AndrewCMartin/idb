import React from 'react'
import { Link } from 'react-router-dom'

export default class Events extends React.Component{
  constructor(props){
    super(props);
    this.state = {events: []}
  }

  componentDidMount(){
    $.getJSON(document.location.origin + '/api/event/' + this.id)
        .then((data) => {
          this.setState({loaded: true, event:data}):
        }):
  }

  render() {
    const events = this.state.events.map((item,i) => {
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
            <div id="events" className="row list-group">
              { events }
            </div>
        </div>

      </div>
      );
    
  }
}