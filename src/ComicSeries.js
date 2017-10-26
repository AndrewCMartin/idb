import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

class ComicSeries extends React.Component{
  constructor(props){
    super(props);
    this.state = {comicseries: []}
  }

  componentDidMount(){
    return axios.get('http://marvelus.me/api/comic_series?results_per_page=50&q={"filters":[{"name":"thumbnail","op":"is_not_null"}]}').then(res=> {
      const comicseries = res.data.objects.map(comic_series => comic_series)
      this.setState({comicseries});
    });
  }

  render() {
    return(
      <div className="container" styles="margin-top:100px;">
          <div className="row">
              {this.state.comicseries.map(comic_series =>
                <div className="col-sm-4">
                  <div className="panel panel-info">
                    <div className="panel-heading"><Link to={"/comic_series/" + comic_series.id}>{comic_series.title}</Link></div>
                    <div className="panel-body"><img src={comic_series.thumbnail} className="img-responsive" styles="width:100%" alt="Image" /></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
  }
}

export default ComicSeries
