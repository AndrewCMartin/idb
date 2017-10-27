import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

class MovieInstance extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          movie: {}
        };
    }

    componentDidMount() {
        return axios.get("http://marvelus.me/api/movie/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1) ).then(res=> {
            const movie = res.data;
            console.log(movie);
            this.setState({movie});
        });
    }
    
    render() {
	const actors = this.state.movie.actors || [];
	const characters = this.state.movie.characters || [];
        return (
            <div class="container" styles="margin: auto; margin-top:100px; width: 500px">
                    <div class="panel panel-default" >
                        <div class="panel-heading"> <h1>{this.state.movie.title}</h1> </div>
                        <div class="panel-body">
                            <div class="panel-body"><img src={"http://image.tmdb.org/t/p/w500/" + this.state.movie.poster_path} class="img-responsive" class="img-responsive" styles="width:100%" alt="Image" />
                                <h3>Information</h3>
                <ul>
		                    <li><b>Title:</b> {this.state.movie.title}</li>
                                    <li><b>Release Date:</b> {this.state.movie.release_date}</li>
                                    <li><b>Overview: </b> {this.state.movie.overview}</li>
		<li><b>Certificate: </b> {this.state.movie.adult}</li>
		<li><b>Original Language: </b> {this.state.movie.lang}</li>
                                    <li><b>Runtime:</b> {this.state.movie.runtime} minutes</li>
                                    <li><b>Rating:</b> {this.state.movie.rating}/10</li>
                                    <li><b>Main Characters:</b>
                <ul>

	    {characters.length > 0 ? characters.map(function(character) {
		return (<li key={character.name}><Link to={`/character/${character.id}`}>{character.name}</Link></li>)
	    }) :"None"}
                                        </ul>
                                    </li>
                                    <li><b>Cast:</b> 
                <ul>
                {actors.length > 0 ? actors.map(function(actor) {

		    return (<li key={actor.name}><Link to={`/actor/${actor.id}`}>{actor.name}</Link></li>)
		}) : "None"}
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


export default MovieInstance
