import React from 'react'
import { Link } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
var axios = require('axios');

var containerStyle = {
    backgroundColor: 'black',
    margin:'auto',
    height: '100vh',  
}

var panelStyle = {
    backgroundColor: 'black',
    color: 'white',

}

var headingStyle= {
    color:'#d3d1d1',
    borderColor: 'white',
    textTransform: 'uppercase',
}

var imageStyle = {
    width: '400px',
    height: '600px',
}



var secColStyle = {
    textTransform: 'uppercase',
    textAlign: 'center',
    color:'#d3d1d1',
}

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
            <div class="container" style={containerStyle}>
                    <div class="panel" style={panelStyle} >
                        <div class="panel-heading" style={headingStyle}> <h1>{this.state.movie.title}</h1> </div>
                        <div class="panel-body">
                            <div class="panel-body">
            <Row>
            <Col xs={5} md={5}>
            <img src={"http://image.tmdb.org/t/p/w500/" + this.state.movie.poster_path} class="img-responsive" class="img-responsive" style={imageStyle} alt="Image" />
            </Col>
            <Col xs={7} md={7}>
                                
                
		                    
                                    <h3 style={headingStyle}>Release Date:</h3>
                                    <p>{this.state.movie.release_date}</p>
                                    <h3 style={headingStyle}>Overview</h3>
                                    <p>{this.state.movie.overview}</p>
                                    <h3 style={headingStyle}>Certificate</h3>
                                    <p>{this.state.movie.adult}</p>
                                    <h3 style={headingStyle}>Original Language</h3>
                                    <p>{this.state.movie.lang}</p>
                                    <h3 style={headingStyle}>Runtime</h3>
                                    <p>{this.state.movie.runtime} minutes</p>
                                    <h3 style={headingStyle}>Rating</h3>
                                    <p>{this.state.movie.rating}/10</p>
            </Col>
            </Row>
            <hr></hr>
            <Row>
            <Col xs={6} md={6}>
           
            
                                    <h3 style={secColStyle}>Main Characters</h3>
                <ul>

	    {characters.length > 0 ? characters.map(function(character) {
		return (<li key={character.name} style={{color:'#d3d1d1'}}><Link to={'/character/${character.id}'}style={{color:'#ed2f2f', fontSize: '17px'}}>{character.name}</Link></li>)
	    }) :<li>None</li>}
                                        </ul>
                                    
                </Col>
                <Col xs={6} md={6}>
                                    <h3 style={secColStyle}>Cast</h3> 
                <ul>
                {actors.length > 0 ? actors.map(function(actor) {

		    return (<li key={actor.name} style={{color:'#d3d1d1'}}><Link to={'/actor/${actor.id}'}style={{color:'#ed2f2f', fontSize: '17px'}}>{actor.name}</Link></li>)
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
