import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

class TVShowInstance extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          tv_show: {}
        };
    }

    componentDidMount() {
        return axios.get("http://marvelus.me/api/tv_show/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1) ).then(res=> {
            const tv_show = res.data;
            console.log(tv_show);
            this.setState({tv_show});
        });
    }

    render() {
        return (
            <div class="container" styles="margin: auto; margin-top:100px; width: 500px">
                    <div class="panel panel-default" >
                        <div class="panel-heading"> <h1>{this.state.tv_show.name}</h1> </div>
                        <div class="panel-body">
                            <div class="panel-body"><img src={"https://image.tmdb.org/t/p/w600/" + this.state.tv_show.poster_path} class="img-responsive" class="img-responsive" styles="width:100%" alt="Image" />
                                <h3>Information</h3>
                                <ul>
                                    <li><b>Name:</b> {this.state.tv_show.name}</li>
                                    <li><b>Overview:</b> {this.state.tv_show.overview}</li>
                                    <li><b>Number of Seasons:</b> {this.state.tv_show.num_seasons}</li>
                                    <li><b>Number of Episodes: </b> {this.state.tv_show.num_episodes}</li>
                                    <li><b>Rating: </b>{this.state.tv_show.rating}</li>
                                    <li>
                                        <b>Characters:</b>
                                        <ul> 
                                            <li>{this.state.tv_show.name}</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Actors:</b>
                                        <ul> 
                                            <li>{this.state.tv_show.name}</li>
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


export default TVShowInstance