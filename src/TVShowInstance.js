import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

var imageStyles = {
    width: '500px',
    height: '500px'
}

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
        const characters = this.state.tv_show.characters || [];
        const actors = this.state.tv_show.actors || [];
        return (
            <div class="container" styles="margin: auto; margin-top:100px; width: 500px">
                    <div class="panel panel-default" >
                        <div class="panel-heading"> <h1>{this.state.tv_show.name}</h1> </div>
                        <div class="panel-body">
                <div class="panel-body"><img src={"https://image.tmdb.org/t/p/w500/" + this.state.tv_show.poster_path} class="img-responsive" class="img-responsive img-center" styles='width:100%' alt="Image" />
                                <h3>Information</h3>
                                <ul>
                                    <li><b>Name:</b> {this.state.tv_show.name}</li>
                                    <li><b>Overview:</b> {this.state.tv_show.overview}</li>
                                    <li><b>Number of Seasons:</b> {this.state.tv_show.num_seasons}</li>
                <li><b>Number of Episodes: </b> {this.state.tv_show.num_episodes}</li>
		<li><b>Last Air Date: </b>{this.state.tv_show.last_air_date}</li>
                                    <li><b>Rating: </b>{this.state.tv_show.rating}</li>
                                    <li>
                                        <b>Characters:</b>
                                        <ul> 
                                            {characters.map(function(character) {
        return (<li key={character.name}><Link to={`/character/${character.id}`}>{character.name}</Link></li>)
        })}
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Actors:</b>
                                        <ul> 
                                            {actors.map(function(actor) {
            return (<li key={actor.name}><Link to={`/actor/${actor.id}`}>{actor.name}</Link></li>)
        })}
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
