import React from 'react'
import {Link} from 'react-router-dom'
import {Col, Row} from 'react-bootstrap'

var axios = require('axios');

var imageStyle={
    height: '550px',
    width: '400px',
}

var containerStyle={
    backgroundColor: 'black',
    margin: 'auto',
    height: '100vh'
}

var panelStyle={
    backgroundColor: 'black',
    color: 'white',
}

var headingStyle={
    color: '#d3d1d1',
    borderColor: 'white',
    textTransform: 'uppercase',
}

var secColStyle = {
    textTransform: 'uppercase',
    textAlign: 'center',
}

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
            <div class="container" style={containerStyle}>
                <div class="panel" style={panelStyle}>
                    <div class="panel-heading" style={headingStyle}><h1>{this.state.actor.name}</h1></div>
                    <div class="panel-body">
                     
                            <Row>
                            <Col xs={5} md={5}>
                            <img src={"https://image.tmdb.org/t/p/w640/" + this.state.actor.image}
                                      class="img-responsive" class="img-responsive" style={imageStyle} alt="Image"/>
                             </Col>
                            <Col xs={7} md={7}>
                                    <h3 style={headingStyle}>Birthday</h3>
                                    <p>{this.state.actor.birthday}</p>
                                    <h3 style={headingStyle}>Biography</h3>
                                    <p> {this.state.actor.bio}</p>
                                    
                                    <h3 style={headingStyle}>Character(s)</h3>
                                  
                                        {characters.length > 0 ? characters.map(function (character) {
                                            return (<p key={character.name}><Link
                                                to={'/character/${character.id}'} style={{color:'#ed2f2f', fontSize: '17px'}}>{character.name}</Link></p>)
                                        }) : "None"}
                                  
                                
                                  
                                  </Col>
                                  </Row>
                                  <hr></hr>
                                  <Row>
                                  <Col xs={6} md={6}>
                                  
                                
                                    <h3 style={secColStyle}>Appears in Movies</h3>
                                    <ul>
                                        {movies.length > 0 ? movies.map(function (movie) {
                                            return (<li key={movie.title}><Link
                                                to={'/movie/${movie.id}'} style={{color:'#ed2f2f', fontSize: '17px'}}>{movie.title}</Link></li>)
                                        }) :<li> "None"</li>}
                                    </ul>
                                </Col>
                                <Col xs={6} md={6}>
                                 
                                
                                    <h3 style={secColStyle}>Appears in TV Shows</h3>
                                    <ul>
                                        {tvshows.length > 0 ? tvshows.map(function (tv_show) {
                                            return (<li key={tv_show.name}><Link
                                                to={'/tvshow/${tv_show.id}'} style={{color:'#ed2f2f', fontSize: '17px'}}>{tv_show.name}</Link></li>)
                                        }) : <li style={{size:'17px'}}>None</li>}
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
