import React from 'react'
import {Link} from 'react-router-dom'
import {Col, Row} from 'react-bootstrap'
import './instance.css'

var axios = require('axios');

{/* Responsible for styling the content in the body */}

class CharacterInstance extends React.Component {
    constructor(props) {
        super(props);
        {/* Store character info we get from query */}
        this.state = {
            character: {}
        };
    }

    componentDidMount() {
        {/* Query and store all data */}
        return axios.get("http://marvelus.me/api/character/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1)).then(res => {
            const character = res.data;
            this.setState({character});
        });
    }

    render() {
        {/* Make containers for actors, movies, etc to store the relationship to this model */}
        const actors = this.state.character.actors || [];
        const events = this.state.character.events || [];
        const series = this.state.character.series || [];
        const tvshows = this.state.character.tvshows || [];
        const movies = this.state.character.movies || [];

        return (
            <div class="container" style={{backgroundColor: 'black', margin: 'auto', height:'100vh'}}>
            <div class="instance">
                <div class="panel">
                    <div class="panel-heading">
           
            <h1>{this.state.character.name}</h1></div>
                    <div class="panel-body">
                        <div class="panel-body">
            <Row>
            <Col xs={5} md ={5}>
            <img src={this.state.character.thumbnail} class="img-responsive"
                                                     class="img-responsive" style={{width:'400px', height: '400px'}} alt="Image"/>
            </Col>
            <Col xs={7} md={7}>
                                {/* Information/attributes of the character */}
                                <h3 >Description</h3>
                                <p>{this.state.character.desc}</p>
                                <br></br>
                                <h3 >Stories</h3>
                                <p>{this.state.character.stories}</p>
                                <br></br>
            {/* Goes through the data in the actors lists, and makes linkable */}
             <h3 >Portrayed by Actors</h3>
                                    <ul>
                                        {actors.length > 0 ? actors.map(function (actor) {


                                            return (
                                                <p key={actor.name}><Link to={`/actor/${actor.id}`} style={{color:'#ed2f2f', fontSize: '17px'}}>{actor.name}</Link>
                                                </p>)
                                        }) : "None"}


                                    </ul>
            </Col>
            </Row>
            <hr></hr>
            <Row>
            <Col xs={3} md={3}>
          
            
            <br></br>
                                   {/* Goes through the data in the events container, lists, and makes linkable */}
                                    <h4>Events</h4>
                                    <br></br>
                                    <ul>
                                        {events.length > 0 ? events.map(function (event) {
                                            return (<li key={event.title} style={{color:'#d3d1d1'}}><Link
                                                to={`/event/${event.id}`} style={{color:'#ed2f2f', fontSize: '17px'}}>{event.title}</Link></li>)
                                        }) : "None"}
                                    </ul>
                                
            </Col>
            <Col xs={3} md={3}>
            
            
            <br></br>

                                    {/* Goes through the data in the comic series container, lists, and makes linkable */}
                                    <h4>Comic Series</h4>
                                    <br></br>
                                    <ul>
                                        {series.length > 0 ? series.map(function (series_instance) {
                                            return (<li key={series_instance.title} style={{color:'#d3d1d1'}}><Link
                                                to={`/comic_series/${series_instance.id}`} style={{color:'#ed2f2f', fontSize: '17px'}}>{series_instance.title}</Link>
                                            </li>)
                                        }) : "None"}
                                    </ul>
                                
             </Col>

            <Col xs={3} md={3}>
            
            
            <br></br>
                                {/* Goes through the data in the movie container, lists, and makes linkable */}
                                    <h4>Appears in Movies</h4>
                                    <br></br>
                                    <ul>
                                        {movies.length > 0 ? movies.map(function (movie) {
                                            return (<li key={movie.title} style={{color:'#d3d1d1'}}><Link
                                                to={`/movie/${movie.id}`} style={{color:'#ed2f2f', fontSize: '17px'}}>{movie.title}</Link></li>)
                                        }) : "None"}
                                    </ul>
                                
                   </Col>
            <Col xs={3} md={3}>
           
            
            <br></br>
                                {/* Goes through the data in the tv shows container, lists, and makes linkable */}
                                    <h4>Appears in TV Shows</h4>
                                    <br></br>
                                    <ul>
                                        {tvshows.length > 0 ? tvshows.map(function (tv_show) {
                                            return (<li key={tv_show.name} style={{color:'#d3d1d1'}}><Link
                                                to={`/tvshow/${tv_show.id}`} style={{color:'#ed2f2f', fontSize: '17px'}}>{tv_show.name}</Link></li>)
                                        }) : "None"}
                                    </ul>
                               
</Col>
</Row>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        );

    }
}


export default CharacterInstance
