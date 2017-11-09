import React from 'react'
import {Link} from 'react-router-dom'
import {Col, Row} from 'react-bootstrap'

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
    color: 'white',
    borderColor: 'white',
    textTransform: 'uppercase',
}

var imageStyle = {
    width: '400px',
    height: '400px',
}

var linkStyle = {
    color: 'white',
}

var secColStyle = {
    textTransform: 'uppercase',
    textAlign: 'center',
}

class CharacterInstance extends React.Component {
    constructor(props) {
        super(props);
        // To store the information of the characters we get from our query
        this.state = {
            character: {}
        };
    }

    componentDidMount() {
        return axios.get("http://marvelus.me/api/character/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1)).then(res => {
            const character = res.data;
            console.log(character);
            this.setState({character});
        });
    }

    render() {
        
        const actors = this.state.character.actors || [];
        const events = this.state.character.events || [];
        const series = this.state.character.comicseries || [];
        const tvshows = this.state.character.tvshows || [];
        const movies = this.state.character.movies || [];

        return (

            <div class="container" style={containerStyle}>
                <div class="panel" style={panelStyle}>
                    <div class="panel-heading" style={headingStyle}>
           
            <h1>{this.state.character.name}</h1></div>
                    <div class="panel-body">
                        <div class="panel-body">
            <Row>
            <Col xs={6} md ={6}>
            <img src={this.state.character.thumbnail} class="img-responsive"
                                                     class="img-responsive" style={imageStyle} alt="Image"/>
            </Col>
            <Col xs={6} md={6}>
            {/*  <h3>Information</h3>
                            <h3>Name</h3> 
                            <ul>
                                <li>{this.state.character.name}</li>*/}
                                <h3 style={headingStyle}>Description</h3>
                                <p>{this.state.character.desc}</p>
                                <h3 style={headingStyle}>Stories</h3>
                                <p>{this.state.character.stories}</p>
             <h3 style={headingStyle}>Portrayed by Actors</h3>
                                    <ul>
                                        {actors.length > 0 ? actors.map(function (actor) {


                                            return (
                                                <li key={actor.name}><Link to={'/actor/${actor.id}'} style={{color:'red', fontSize: '16px'}}>{actor.name}</Link>
                                                </li>)
                                        }) : "None"}


                                    </ul>
            </Col>
            </Row>
            <Row>
            <Col xs={3} md={3}>
            <br></br>
            <br></br>
                               
                                    <h4 style={secColStyle}>Events</h4>
                                    <ul>
                                        {events.length > 0 ? events.map(function (event) {
                                            return (<li key={event.title}><Link
                                                to={'/event/${event.id}'} style={{color:'red', fontSize: '16px'}}>{event.title}</Link></li>)
                                        }) : "None"}
                                    </ul>
                                
            </Col>
            <Col xs={3} md={3}>
            <br></br>
            <br></br>

                                
                                    <h4 style={secColStyle}>Comic Series</h4>
                                    <ul>
                                        {series.length > 0 ? series.map(function (series_instance) {
                                            return (<li key={series_instance.title}><Link
                                                to={'/comic_series/${series_instance.id}'} style={{color:'red', fontSize: '16px'}}>{series_instance.title}</Link>
                                            </li>)
                                        }) : "None"}
                                    </ul>
                                
             </Col>

            <Col xs={3} md={3}>
            <br></br>
            <br></br>
                                
                                    <h4 style={secColStyle}>Appears in Movies</h4>
                                    <ul>
                                        {movies.length > 0 ? movies.map(function (movie) {
                                            return (<li key={movie.title}><Link
                                                to={'/movie/${movie.id}'} style={{color:'red', fontSize: '16px'}}>{movie.title}</Link></li>)
                                        }) : "None"}
                                    </ul>
                                
                   </Col>
            <Col xs={3} md={3}>
            <br></br>
            <br></br>
                                
                                    <h4 style={secColStyle}>Appears in TV Shows</h4>
                                    <ul>
                                        {tvshows.length > 0 ? tvshows.map(function (tv_show) {
                                            return (<li key={tv_show.name}><Link
                                                to={'/tvshow/${tv_show.id}'} style={{color:'red', fontSize: '16px'}}>{tv_show.name}</Link></li>)
                                        }) : "None"}
                                    </ul>
                               


{/*</ul>*/}
</Col>
</Row>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}


export default CharacterInstance
