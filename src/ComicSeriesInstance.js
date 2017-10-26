import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

class ComicSeriesInstance extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          comic_series: {}
        };
    }

    componentDidMount() {
        return axios.get("http://marvelus.me/api/comic_series/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1) ).then(res=> {
            const comic_series = res.data;
            console.log(comic_series);
            this.setState({comic_series});
        });
    }

    render() {
        return (
            <div class="container" styles="margin: auto; margin-top:100px; width: 500px">
                    <div class="panel panel-default" >
                        <div class="panel-heading"> <h1>{this.state.comic_series.title}</h1> </div>
                        <div class="panel-body">
                            <div class="panel-body"><img src={this.state.comic_series.thumbnail} class="img-responsive" class="img-responsive" styles="width:100%" alt="Image" />
                                <h3>Information</h3>
                                <ul>
                                    <li><b>Title:</b> {this.state.comic_series.name}</li>
                                    <li><b>Description:</b> {this.state.comic_series.desc}</li>
                                    <li><b>Start Year:</b> {this.state.comic_series.start_year}</li>
                                    <li><b>End Year: </b> {this.state.comic_series.end_year}</li>
                <li><b>Rating: </b>{this.state.comic_series.rating}</li>
		<li><b>Runtime: </b>{this.state.comic_series.runtime}</li>}
                                    <li>
                                        <b>Characters:</b>
                                        <ul> 
                                            <li>{this.state.comic_series.name}</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Events:</b>
                                        <ul> 
                                            <li>{this.state.comic_series.name}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
        </div>

        );

    }
}


export default ComicSeriesInstance
