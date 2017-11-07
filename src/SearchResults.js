import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Panel} from 'react-bootstrap'

var axios = require('axios');

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actor_results: {},
            character_results: {},
            comic_results: {},
            event_results: {},
            movie_results: {},
            tvshow_results: {},
            
        };
    }

    componentDidMount() {
        //actor
        axios.get("http://marvelus.me/api/search/actor?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)).then(res => {
            const actor = res.data;
            console.log(actor);
            this.setState({actor_results : actor.objects});
        });
        //character
        axios.get("http://marvelus.me/api/search/character?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)).then(res => {
            const character = res.data;
            console.log(character);
            this.setState({character_results : character.objects});
        });
        //comic_series
        axios.get("http://marvelus.me/api/search/comic_series?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)).then(res => {
            const comic_series = res.data;
            console.log(comic_series);
            this.setState({comic_results : comic_series.objects});
        });
        //event
        axios.get("http://marvelus.me/api/search/event?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)).then(res => {
            const event = res.data;
            console.log(event);
            this.setState({event_results : event.objects});
        });
        //movie
        axios.get("http://marvelus.me/api/search/movie?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)).then(res => {
            const movie = res.data;
            console.log(movie);
            this.setState({movie_results : movie.objects});
        });
        //tvshow
        axios.get("http://marvelus.me/api/search/tvshow?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)).then(res => {
            const tvshow = res.data;
            console.log(tvshow);
            this.setState({tvshow_results : tvshow.objects});
        });
    }

    render() {
        const actors = this.state.actor_results || [];        
        const characters = this.state.character_results || [];        
        const comics = this.state.comic_results || [];        
        const events = this.state.event_results || [];        
        const tvshows = this.state.tvshow_results || [];        
        const movies = this.state.movie_results || [];        

        return (
            <div>
                <Panel header={"Actor Results"}>
                    {actors.length > 0 ? actors.map(function(actor) {
                        return (<li key={actor.name}><Link to={`/actor/${actor.id}`}>{actor.name}</Link></li>)
                                        }) : "None"}
                </Panel>

                <Panel header={"Character Results"}>
                    {characters.length > 0 ? characters.map(function(character) {
                        return (<li key={character.name}><Link to={`/character/${character.id}`}>{character.name}</Link></li>)
                                        }) : "None"}
                </Panel>

                <Panel header={"Comic-Series Results"}>
                    {comics.length > 0 ? comics.map(function(comic) {
                        return (<li key={comic.title}><Link to={`/comic_series/${comic.id}`}>{comic.title}</Link></li>)
                                        }) : "None"}
                </Panel>

                <Panel header={"Event Results"}>
                    {events.length > 0 ? events.map(function(event) {
                        return (<li key={event.title}><Link to={`/event/${event.id}`}>{event.title}</Link></li>)
                                        }) : "None"}
                </Panel>

                <Panel header={"Movies Results"}>
                    {movies.length > 0 ? movies.map(function(movie) {
                        return (<li key={movie.title}><Link to={`/movie/${movie.id}`}>{movie.title}</Link></li>)
                                        }) : "None"}
                </Panel>

                <Panel header={"TV Shows Results"}>
                    {tvshows.length > 0 ? tvshows.map(function(tvshow) {
                        return (<li key={tvshow.name}><Link to={`/tvshow/${tvshow.id}`}>{tvshow.name}</Link></li>)
                                        }) : "None"}
                </Panel>
            </div>
        );
    }
}


export default SearchResults