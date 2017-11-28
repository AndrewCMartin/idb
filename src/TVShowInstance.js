import React from 'react'
import { Link } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
var axios = require('axios');

{/* Responsible for styling the content in the body */}

class TVShowInstance extends React.Component {
    constructor(props) {
        super(props);
        {/* Store tv show info we get from query */}
        this.state = {
          tv_show: {}
        };
    }

    componentDidMount() {
        {/* Query and store all data */}
        return axios.get("http://marvelus.me/api/tv_show/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1) ).then(res=> {
            const tv_show = res.data;
            this.setState({tv_show});
        });
    }

    render() {
        {/* Make containers for characters, actors to store the relationship to this model */}
        const characters = this.state.tv_show.characters || [];
        const actors = this.state.tv_show.actors || [];
        return (
            <div class="container" style={{backgroundColor: 'black', margin: 'auto', height:'100'}}>
            <div class="instance">
                    <div class="panel" >
                        <div class="panel-heading"> <h1>{this.state.tv_show.name}</h1> </div>
                        <div class="panel-body">
                            <Row>
                                
                                {/* Information/attributes of the show */}
                                <Col xs={5} md={5}>
                                    <img src={"https://image.tmdb.org/t/p/w500/" + this.state.tv_show.poster_path} class="img-responsive" class="img-responsive img-center" styles='width:100%' alt="Image" />
                                </Col>
                                <Col xs={7} md={7}>
                                    <h3>Overview</h3>
                                    <p>{this.state.tv_show.overview}</p>
                                    <h3>Number of Seasons</h3> 
                                    <p>{this.state.tv_show.num_seasons}</p>
                                    <h3>Number of Episodes</h3>
                                    <p>{this.state.tv_show.num_episodes}</p>
                                    <h3>Last Air Date</h3>
                                    <p>{this.state.tv_show.last_air_date}</p>
                                    <h3>Rating</h3>
                                    <p>{this.state.tv_show.rating}</p>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col xs={6} md={6}>
                                    {/* Goes through the data in the character lists, and makes linkable */}
                                    <h4>Characters</h4>
                                    <ul> 
                                        {characters.length > 0 ? characters.map(function(character) {
                                            return (<li key={character.name}style={{color:'#d3d1d1'}}><Link to={`/character/${character.id}`}style={{color:'#ed2f2f', fontSize: '17px'}}>{character.name}</Link></li>)
                                        }) : <li>None</li>}
                                    </ul>     
                                </Col>            
                                <Col xs={6} md={6}>
                                        <h4>Actors</h4>
                                        <ul> 
                                            {actors.length > 0 ? actors.map(function(actor) {
                                                return (<li key={actor.name}style={{color:'#d3d1d1'}}><Link to={`/actor/${actor.id}`}style={{color:'#ed2f2f', fontSize: '17px'}}>{actor.name}</Link></li>)
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


export default TVShowInstance
