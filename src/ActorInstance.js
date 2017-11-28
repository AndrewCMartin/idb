import React from 'react'
import {Link} from 'react-router-dom'
import {Col, Row} from 'react-bootstrap'
import './instance.css'
var axios = require('axios');

{/* Responsible for styling the content in the body */}

class ActorInstance extends React.Component {
    constructor(props) {
        super(props);
        {/* Store actor info we get from query */}
        this.state = {
            actor: {}
        };
    }

    componentDidMount() {
        {/* Query and store all data */}
        return axios.get("http://marvelus.me/api/actor/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1)).then(res => {
            const actor = res.data;
            this.setState({actor});
        });
    }

    render() {
        {/* Make containers for characters, movies, tvshows to store the relationship to this model */}
        const characters = this.state.actor.characters || [];
        const movies = this.state.actor.movies || [];
        const tvshows = this.state.actor.tvshows || [];
        return (
            <div class="container"  style={{backgroundColor: 'black', margin: 'auto', height:'100vh'}}>
            <div class="instance">
                <div class="panel" >
                    <div class="panel-heading"><h1>{this.state.actor.name}</h1></div>
                    <div class="panel-body">
                        <Row>
                            <Col xs={5} md={5}>
                            <img src={"https://image.tmdb.org/t/p/w640/" + this.state.actor.image}
                                        class="img-responsive" class="img-responsive"  alt="Image"/>
                            </Col>
                
                            {/* Information/attributes of the actor */}
                            <Col xs={7} md={7}>
                                    <h3>Birthday</h3>
                                    <p>{this.state.actor.birthday}</p>
                                    <h3>Biography</h3>
                                    <p> {this.state.actor.bio}</p>
                                   
                                    {/* Goes through the data in the character lists, and makes linkable */}
                                    <h3>Character(s)</h3>
                                        {characters.length > 0 ? characters.map(function (character) {
                                            return (<p key={character.name}><Link
                                                to={`/character/${character.id}`} style={{color:'#ed2f2f', fontSize: '17px'}}>{character.name}</Link></p>)
                                        }) : "None"}
                             </Col>
                             </Row>
                             <hr></hr>
                             <Row>
                             <Col xs={6} md={6}>
                                 
                                {/* Goes through the data in the character lists, and makes linkable */}
                                <h4>Appears in Movies</h4>
                                <ul>
                                    {movies.length > 0 ? movies.map(function (movie) {
                                        return (<li key={movie.title}><Link
                                            to={`/movie/${movie.id}`} style={{color:'#ed2f2f', fontSize: '17px'}}>{movie.title}</Link></li>)
                                    }) :<li> "None"</li>}
                                </ul>
                                </Col>

                                <Col xs={6} md={6}>

                                {/* Goes through the data in the character lists, and makes linkable */}
                                    <h4>Appears in TV Shows</h4>
                                    <ul>
                                        {tvshows.length > 0 ? tvshows.map(function (tv_show) {
                                            return (<li key={tv_show.name}><Link
                                                to={`/tvshow/${tv_show.id}`} style={{color:'#ed2f2f', fontSize: '17px'}}>{tv_show.name}</Link></li>)
                                        }) : <li style={{size:'17px'}}>None</li>}
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


export default ActorInstance
