import React from 'react'
import {Link} from 'react-router-dom'
import {Col, Pagination, Panel, Row} from 'react-bootstrap'

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
            query_string: "",
            results_per_page: 6,
            actor_results: {},
            character_results: {},
            comic_results: {},
            event_results: {},
            movie_results: {},
            tvshow_results: {},

        };

        this.updateActorItems = this.updateActorItems.bind(this);
        this.updateCharacterItems = this.updateCharacterItems.bind(this);
        this.updateComicItems = this.updateComicItems.bind(this);
        this.updateEventItems = this.updateEventItems.bind(this);
        this.updateMovieItems = this.updateMovieItems.bind(this);
        this.updateTVShowItems = this.updateTVShowItems.bind(this);

    }

    updateActorItems(page) {
        var params = {"query": this.state.query_string, "results_per_page": this.state.results_per_page, "page": page};
        axios.get("http://marvelus.me/api/search/actor", {params: params}).then(res => {
            const actor = res.data;
            console.log(actor);
            this.setState({actor_results: actor});
        });
    }

    updateCharacterItems(page) {
        var params = {"query": this.state.query_string, "results_per_page": this.state.results_per_page, "page": page};
        axios.get("http://marvelus.me/api/search/character", {params: params}).then(res => {
            const character = res.data;
            console.log(character);
            this.setState({character_results: character});
        });
    }

    updateComicItems(page) {
        var params = {"query": this.state.query_string, "results_per_page": this.state.results_per_page, "page": page};
        axios.get("http://marvelus.me/api/search/comic_series", {params: params}).then(res => {
            const comic_series = res.data;
            console.log(comic_series);
            this.setState({comic_results: comic_series});
        });
    }

    updateEventItems(page) {
        var params = {"query": this.state.query_string, "results_per_page": this.state.results_per_page, "page": page};
        axios.get("http://marvelus.me/api/search/event", {params: params}).then(res => {
            const event = res.data;
            console.log(event);
            this.setState({event_results: event});
        });
    }

    updateMovieItems(page) {
        var params = {"query": this.state.query_string, "results_per_page": this.state.results_per_page, "page": page};
        axios.get("http://marvelus.me/api/search/movie", {params: params}).then(res => {
            const movie = res.data;
            console.log(movie);
            this.setState({movie_results: movie});
        });
    }

    updateTVShowItems(page) {
        var params = {"query": this.state.query_string, "results_per_page": this.state.results_per_page, "page": page};
        axios.get("http://marvelus.me/api/search/tvshow", {params: params}).then(res => {
            const tvshow = res.data;
            console.log(tvshow);
            this.setState({tvshow_results: tvshow});
        });
    }

    componentDidMount() {
        this.state.query_string = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);

        this.updateActorItems(1);
        this.updateCharacterItems(1);
        this.updateComicItems(1);
        this.updateMovieItems(1);
        this.updateTVShowItems(1);
        this.updateEventItems(1);
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
            <div className="container" styles="margin-top:100px;">
                <h1>Actor Results</h1>
                <Row>
                    {actors.length > 0 ? actors.map(function (actor) {
                        return (
                            <Col md={2} sm={4} xs={12}>
                                <Link to={`/actor/${actor.id}`}>
                                    <Panel header={actor.name} footer={"Movies: " + actor.movies.length}>
                                        <img
                                            src={"https://image.tmdb.org/t/p/w185" + actor.image}
                                            className="img-responsive" style={imageStyles}
                                            alt="Image"/>
                                    </Panel>

                                </Link>
                            </Col>

                        )
                    }) : this.state.actor_results.length > 0 ? "None" : "Loading..."}
                </Row>

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
                            onSelect={this.updateActorItems}/>
                    }
                </div>
                <h1>Movie Results</h1>
                <Row>
                    {movies.length > 0 ? movies.map(function (movie) {
                        return (
                            <Col md={2} sm={4} xs={12}>
                                <Link to={`/movie/${movie.id}`}>
                                    <Panel header={movie.title}>
                                        <img
                                            src={"https://image.tmdb.org/t/p/w185" + movie.poster_path}
                                            className="img-responsive" style={imageStyles}
                                            alt="Image"/>
                                    </Panel>

                                </Link>
                            </Col>

                        )
                    }) : "None"}
                </Row>
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
                            onSelect={this.updateMovieItems}/>
                    }
                </div>

                <h1>TV Show Results</h1>
                <Row>
                    {tvshows.length > 0 ? tvshows.map(function (tvshow) {
                        return (
                            <Col md={2} sm={4} xs={12}>
                                <Link to={`/tvshow/${tvshow.id}`}>
                                    <Panel header={tvshow.name}>
                                        <img
                                            src={"https://image.tmdb.org/t/p/w185" + tvshow.poster_path}
                                            className="img-responsive" style={imageStyles}
                                            alt="Image"/>
                                    </Panel>

                                </Link>
                            </Col>

                        )
                    }) : "None"}
                </Row>
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
                            onSelect={this.updateTVShowItems}/>
                    }
                </div>
                <h1>Character Results</h1>
                <Row>
                    {characters.length > 0 ? characters.map(function (character) {
                        return (
                            <Col md={2} sm={4} xs={12}>
                                <Link to={`/character/${character.id}`}>
                                    <Panel header={character.name} footer={"Actors: " + character.actors.length}>
                                        <img
                                            src={character.thumbnail}
                                            className="img-responsive" style={imageStyles}
                                            alt="Image"/>
                                    </Panel>

                                </Link>
                            </Col>

                        )
                    }) : "None"}
                </Row>

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
                            onSelect={this.updateCharacterItems}/>
                    }
                </div>


                <h1>Comic Series Results</h1>
                <Row>
                    {comics.length > 0 ? comics.map(function (comic) {
                        return (
                            <Col md={2} sm={4} xs={12}>
                                <Link to={`/comic_series/${comic.id}`}>
                                    <Panel header={comic.title}>
                                        <img
                                            src={comic.thumbnail}
                                            className="img-responsive" style={imageStyles}
                                            alt="Image"/>
                                    </Panel>

                                </Link>
                            </Col>

                        )
                    }) : "None"}
                </Row>
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
                            onSelect={this.updateEventItems}/>
                    }
                </div>

                <h1>Event Results</h1>
                <Row>
                    {events.length > 0 ? events.map(function (event) {
                        return (
                            <Col md={2} sm={4} xs={12}>
                                <Link to={`/event/${event.id}`}>
                                    <Panel header={event.title}>
                                        <img
                                            src={event.thumbnail}
                                            className="img-responsive" style={imageStyles}
                                            alt="Image"/>
                                    </Panel>

                                </Link>
                            </Col>

                        )
                    }) : "None"}
                </Row>

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
                            onSelect={this.updateEventItems}/>
                    }
                </div>


            </div>
        );
    }
}


export default SearchResults