import React from 'react'
import { Link } from 'react-router-dom'

export default class ComicSeries extends React.Component{
  constructor(props){
    super(props);
    this.state = {comicseries: []}
  }

  componentDidMount(){
    $.getJSON(document.location.origin + '/api/comic_series/' + this.id)
        .then((data) => {
          this.setState({loaded: true, comic_series:data}):
        }):
  }

  render() {
    const comicseries = this.state.comicseries.map((item,i) => {
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
            <div id="comicseries" className="row list-group">
              { movies }
            </div>
        </div>

      </div>
      );
    
  }
}