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

var listStyle = {
    color: 'blue',
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
            <Col xs={7} md ={5}>
            <img src={this.state.character.thumbnail} class="img-responsive"
                                                     class="img-responsive" style={imageStyle} alt="Image"/>
            </Col>
            <Col xs={6} md={6}>
                            <h3>Information</h3>
                            <ul>
                                <li><b>Name:</b> {this.state.character.name}</li>
                                <li><b>Description:</b> {this.state.character.desc}</li>
                                <li><b>Stories:</b> {this.state.character.stories}</li>
                                <li>
                                    <b>Events:</b>
                                    <ul>
                                        {events.length > 0 ? events.map(function (event) {
                                            return (<li key={event.title}><Link
                                                to={`/event/${event.id}`} style={{color:'red'}}>{event.title}</Link></li>)
                                        }) : "None"}
                                    </ul>
                                </li>

                                <li>
                                    <b>Comic Series:</b>
                                    <ul>
                                        {series.length > 0 ? series.map(function (series_instance) {
                                            return (<li key={series_instance.title}><Link
                                                to={`/comic_series/${series_instance.id}`}>{series_instance.title}</Link>
                                            </li>)
                                        }) : "None"}
                                    </ul>
                                </li>
                                <li>
                                    <b>Portrayed by Actors:</b>
                                    <ul>
                                        {actors.length > 0 ? actors.map(function (actor) {


                                            return (
                                                <li key={actor.name}><Link to={`/actor/${actor.id}`}>{actor.name}</Link>
                                                </li>)
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
            </div>

        );

    }
}


export default CharacterInstance
