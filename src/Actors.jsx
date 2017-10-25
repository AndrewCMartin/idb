import React from 'react'
import { Link } from 'react-router-dom'

export default class Actors extends React.Component{
  constructor(props){
    super(props);
    this.state = {actors: []}
  }

  componentDidMount(){
    $.getJSON(document.location.origin + '/api/actor/' + this.id)
        .then((data) => {
          this.setState({loaded: true, actor:data}):
        }):
  }

  render() {
    const actors = this.state.actors.map((item,i) => {
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
            <div id="actors" className="row list-group">
              { actors }
            </div>
        </div>

      </div>
      );
    
  }
}