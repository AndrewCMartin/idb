import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Panel, Pagination} from 'react-bootstrap'

var axios = require('axios');

var imageStyles = {
    //height: '500px',
    width: 'fit-content',
    display: 'inline'
};


var changeColor = {
    backgroundColor: 'black',
    borderColor: 'white',
};

var linkColor = {
    color: 'white',
}

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


        this.handleActorsSelect = this.handleActorsSelect.bind(this);
        this.updateActorItems = this.updateActorItems.bind(this);

        this.handleCharactersSelect = this.handleCharactersSelect.bind(this);
        this.updateCharacterItems = this.updateCharacterItems.bind(this);

        this.handleComicsSelect = this.handleComicsSelect.bind(this);
        this.updateComicItems = this.updateComicItems.bind(this);

        this.handleEventsSelect = this.handleEventsSelect.bind(this);
        this.updateEventItems = this.updateEventItems.bind(this);

        this.handleMoviesSelect = this.handleMoviesSelect.bind(this);
        this.updateMovieItems = this.updateMovieItems.bind(this);

        this.handleTVShowsSelect = this.handleTVShowsSelect.bind(this);
        this.updateTVShowItems = this.updateTVShowItems.bind(this);

    }

    updateActorItems(page) {
        axios.get("http://marvelus.me/api/search/actor?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)+"&page="+page).then(res => {
            const actor = res.data;
            console.log(actor);
            this.setState({actor_results : actor});
        });
    }

    updateCharacterItems(page) {
        axios.get("http://marvelus.me/api/search/character?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)+"&page="+page).then(res => {
            const character = res.data;
            console.log(character);
            this.setState({character_results : character});
        });
    }
    updateComicItems(page) {
        axios.get("http://marvelus.me/api/search/comic_series?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)+"&page="+page).then(res => {
            const comic_series = res.data;
            console.log(comic_series);
            this.setState({comic_results : comic_series});
        });
    }
    updateEventItems(page) {
        axios.get("http://marvelus.me/api/search/event?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)+"&page="+page).then(res => {
            const event = res.data;
            console.log(event);
            this.setState({event_results : event});
        });
    }
    updateMovieItems(page) {
        axios.get("http://marvelus.me/api/search/movie?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)+"&page="+page).then(res => {
            const movie = res.data;
            console.log(movie);
            this.setState({movie_results : movie});
        });
    }
    updateTVShowItems(page) {
        axios.get("http://marvelus.me/api/search/tvshow?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)+"&page="+page).then(res => {
            const tvshow = res.data;
            console.log(tvshow);
            this.setState({tvshow_results : tvshow});
        });
    }

    componentDidMount() {
        //actor
        axios.get("http://marvelus.me/api/search/actor?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)).then(res => {
            const actor = res.data;
            console.log(actor);
            this.setState({actor_results : actor});
        });

        //character
        axios.get("http://marvelus.me/api/search/character?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)).then(res => {
            const character = res.data;
            console.log(character);
            this.setState({character_results : character});
        });
        //comic_series
        axios.get("http://marvelus.me/api/search/comic_series?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)).then(res => {
            const comic_series = res.data;
            console.log(comic_series);
            this.setState({comic_results : comic_series});
        });
        //event
        axios.get("http://marvelus.me/api/search/event?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)).then(res => {
            const event = res.data;
            console.log(event);
            this.setState({event_results : event});
        });
        //movie
        axios.get("http://marvelus.me/api/search/movie?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)).then(res => {
            const movie = res.data;
            console.log(movie);
            this.setState({movie_results : movie});
        });
        //tvshow
        axios.get("http://marvelus.me/api/search/tvshow?query=" + window.location.href.substring(window.location.href.lastIndexOf("=") + 1)).then(res => {
            const tvshow = res.data;
            console.log(tvshow);
            this.setState({tvshow_results : tvshow});
        });
    }

    handleActorsSelect(eventKey) {
        this.updateActorItems(eventKey);
    }
    handleCharactersSelect(eventKey) {
        this.updateCharacterItems(eventKey);
    }
    handleComicsSelect(eventKey) {
        this.updateComicItems(eventKey);
    }
    handleEventsSelect(eventKey) {
        this.updateEventItems(eventKey);
    }
    handleTVShowsSelect(eventKey) {
        this.updateTVShowItems(eventKey);
    }
    handleMoviesSelect(eventKey) {
        this.updateMovieItems(eventKey);
    }

    render() {
        var ulStyles = {
            minWidth: '696px',
            listStyle: 'none',
            paddingTop: '20px',
        };
        
        var liStyles = {
            display: 'inline'
        };
        

        const actors = this.state.actor_results.objects || [];        
        const characters = this.state.character_results.objects || [];        
        const comics = this.state.comic_results.objects || [];        
        const events = this.state.event_results.objects || [];        
        const tvshows = this.state.tvshow_results.objects || [];        
        const movies = this.state.movie_results.objects || [];        

        return (
            <div>
                <Panel header={"Actor Results"}>
                    <ul style={ulStyles}>

                    {actors.length > 0 ? actors.map(function(actor) {
                        return (
                                <li key={actor.name} style={liStyles}>
                                    <Link to={`/actor/${actor.id}`}>
                                        <div className="panel-heading">
                                            <div>{actor.name}</div>
                                        </div>
                                        <img
                                            src={"https://image.tmdb.org/t/p/w150" + actor.image}
                                            className="img-responsive" style={imageStyles}
                                            alt="Image"/>

                                    </Link>
                                </li>
                            )
                                        }) : "None"}
                    </ul>

                    <div className='text-center'>
                        {!this.state.actor_results.total_pages
                            ? null
                            : <Pagination
                                bsSize='small'
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                items={this.state.actor_results.total_pages}
                                maxButtons={10}
                                activePage={this.state.actor_results.page}
                                onSelect={this.handleActorsSelect}/>
                        }
                    </div>
                </Panel>

                <Panel header={"Character Results"}>
                    {characters.length > 0 ? characters.map(function(character) {
                        return (<li key={character.name}><Link to={`/character/${character.id}`}>{character.name}</Link></li>)
                                        }) : "None"}

                    <div className='text-center'>
                        {!this.state.character_results.total_pages
                            ? null
                            : <Pagination
                                bsSize='small'
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                items={this.state.character_results.total_pages}
                                maxButtons={10}
                                activePage={this.state.character_results.page}
                                onSelect={this.handleCharactersSelect}/>
                        }
                    </div>
                </Panel>

                <Panel header={"Comic-Series Results"}>
                    {comics.length > 0 ? comics.map(function(comic) {
                        return (<li key={comic.title}><Link to={`/comic_series/${comic.id}`}>{comic.title}</Link></li>)
                                        }) : "None"}
                                        
                    <div className='text-center'>
                        {!this.state.comic_results.total_pages
                            ? null
                            : <Pagination
                                bsSize='small'
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                items={this.state.comic_results.total_pages}
                                maxButtons={10}
                                activePage={this.state.comic_results.page}
                                onSelect={this.handleComicsSelect}/>
                        }
                    </div>
                </Panel>

                <Panel header={"Event Results"}>
                    {events.length > 0 ? events.map(function(event) {
                        return (<li key={event.title}><Link to={`/event/${event.id}`}>{event.title}</Link></li>)
                                        }) : "None"}

                    <div className='text-center'>
                        {!this.state.event_results.total_pages
                            ? null
                            : <Pagination
                                bsSize='small'
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                items={this.state.event_results.total_pages}
                                maxButtons={10}
                                activePage={this.state.event_results.page}
                                onSelect={this.handleEventsSelect}/>
                        }
                    </div>
                </Panel>

                <Panel header={"Movies Results"}>
                    {movies.length > 0 ? movies.map(function(movie) {
                        return (<li key={movie.title}><Link to={`/movie/${movie.id}`}>{movie.title}</Link></li>)
                                        }) : "None"}
                    <div className='text-center'>
                        {!this.state.movie_results.total_pages
                            ? null
                            : <Pagination
                                bsSize='small'
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                items={this.state.movie_results.total_pages}
                                maxButtons={10}
                                activePage={this.state.movie_results.page}
                                onSelect={this.handleMoviesSelect}/>
                        }
                    </div>
                </Panel>

                <Panel header={"TV Shows Results"}>
                    {tvshows.length > 0 ? tvshows.map(function(tvshow) {
                        return (<li key={tvshow.name}><Link to={`/tvshow/${tvshow.id}`}>{tvshow.name}</Link></li>)
                                        }) : "None"}

                    <div className='text-center'>
                        {!this.state.tvshow_results.total_pages
                            ? null
                            : <Pagination
                                bsSize='small'
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                items={this.state.tvshow_results.total_pages}
                                maxButtons={10}
                                activePage={this.state.tvshow_results.page}
                                onSelect={this.handleTVShowsSelect}/>
                        }
                    </div>
                </Panel>
            </div>
        );
    }
}


export default SearchResults