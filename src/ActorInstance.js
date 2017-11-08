import React from 'react'
import {Link} from 'react-router-dom'
import {Col, Row} from 'react-bootstrap'

var axios = require('axios');

class ActorInstance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actor: {}
        };
    }

    componentDidMount() {
        return axios.get("http://marvelus.me/api/actor/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1)).then(res => {
            const actor = res.data;
            console.log(actor);
            this.setState({actor});
        });
    }

    render() {
        const characters = this.state.actor.characters || [];
        const movies = this.state.actor.movies || [];
        const tvshows = this.state.actor.tvshows || [];
        return (
            <div class="container" styles="margin: auto; margin-top:100px; width: 500px">
                <div class="panel panel-default">
                    <div class="panel-heading"><h1>{this.state.actor.name}</h1></div>
                    <div class="panel-body">
                     
                            <Row>
                            <Col xs={6} md={6}>
                            <img src={"https://image.tmdb.org/t/p/w640/" + this.state.actor.image}
                                      class="img-responsive" class="img-responsive" styles="width:100%" alt="Image"/>
                             </Col>
                            <Col xs={6} md={6}>
                                <h3><b>Information</b></h3>
                                  <ul>
                                    <li><b>Name:</b> {this.state.actor.name}</li>
                                    <li><b>Bio:</b> {this.state.actor.bio}</li>
                                    <li><b>Birthday:</b> {this.state.actor.birthday}</li>
                                    <li><b>Character(s): </b>
                                  <ul>
                                        {characters.length > 0 ? characters.map(function (character) {
                                            return (<li key={character.name}><Link
                                                to={`/character/${character.id}`}>{character.name}</Link></li>)
                                        }) : "None"}
                                  </ul>
                                </li>
                                <li>
                                    <b>Appears in Movies:</b>
                                    <ul>
                                        {movies.length > 0 ? movies.map(function (movie) {
                                            return (<li key={movie.title}><Link
                                                to={`/movie/${movie.id}`}>{movie.title}</Link></li>)
                                        }) : "None"}
                                    </ul>
                                </li>
                                <li>
                                    <b>Appears in TV Shows:</b>
                                    <ul>
                                        {tvshows.length > 0 ? tvshows.map(function (tv_show) {
                                            return (<li key={tv_show.name}><Link
                                                to={`/tvshow/${tv_show.id}`}>{tv_show.name}</Link></li>)
                                        }) : "None"}
                                    </ul>
                                </li>
                                  </ul>
                                </Col>
                            </Row>
                    </div>
                </div>
            </div>

        );

    }
}


export default ActorInstance
