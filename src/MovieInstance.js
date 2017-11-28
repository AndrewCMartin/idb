import React from 'react'
import { Link } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import './instance.css'
var axios = require('axios');

{/* Responsible for styling the content in the body */}

class MovieInstance extends React.Component {
    constructor(props) {
        super(props);
        {/* Store movie info we get from query */}
        this.state = {
          movie: {}
        };
    }

    componentDidMount() {
        {/* Query and store all data */}
        return axios.get("http://marvelus.me/api/movie/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1) ).then(res=> {
            const movie = res.data;
            this.setState({movie});
        });
    }
    
    render() {
        {/* Make containers for characters, actors to store the relationship to this model */}
        const actors = this.state.movie.actors || [];
        const characters = this.state.movie.characters || [];
        return (
            <div class="container"  style={{backgroundColor: 'black', margin: 'auto', height:'100'}}>
            <div class= "instance">
                    <div class="panel">
                        <div class="panel-heading"> <h1>{this.state.movie.title}</h1> </div>
                        <div class="panel-body">
                            <Row>
                                <Col xs={5} md={5}>
                                    <img src={"http://image.tmdb.org/t/p/w500/" + this.state.movie.poster_path} class="img-responsive" class="img-responsive" style={{width:'400px', height: '600px'}} alt="Image" />
                                </Col>
                                    {/* Information/attributes of the movie */}
                                    <Col xs={7} md={7}>
                                        <h3>Release Date:</h3>
                                        <p>{this.state.movie.release_date}</p>
                                        <h3>Overview</h3>
                                        <p>{this.state.movie.overview}</p>
                                        <h3>Certificate</h3>
                                        <p>{this.state.movie.adult}</p>
                                        <h3>Original Language</h3>
                                        <p>{this.state.movie.lang}</p>
                                        <h3>Runtime</h3>
                                        <p>{this.state.movie.runtime} minutes</p>
                                        <h3>Rating</h3>
                                        <p>{this.state.movie.rating}/10</p>
                                    </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col xs={6} md={6}>
                                    <h4>Main Characters</h4>
                                    <ul>
                                        {characters.length > 0 ? characters.map(function(character) {
                                        return (<li key={character.name} style={{color:'#d3d1d1'}}><Link to={`/character/${character.id}`}style={{color:'#ed2f2f', fontSize: '17px'}}>{character.name}</Link></li>)
                                        }) :<li>None</li>}
                                    </ul>    
                                </Col>
                                <Col xs={6} md={6}>
                                    <h4>Cast</h4> 
                                    <ul>
                                        {actors.length > 0 ? actors.map(function(actor) {

                                            return (<li key={actor.name} style={{color:'#d3d1d1'}}><Link to={`/actor/${actor.id}`}style={{color:'#ed2f2f', fontSize: '17px'}}>{actor.name}</Link></li>)
                                        }) : <li>None</li>}
                                    </ul>
                                    
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
        </div>
        );

    }
}


export default MovieInstance
