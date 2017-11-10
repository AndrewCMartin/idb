import React from 'react'
import {Link} from 'react-router-dom'
import {Button, DropdownButton, Form, FormControl, FormGroup, MenuItem, OverlayTrigger, Pagination, Popover} from 'react-bootstrap'
import Highlighter from 'react-highlight-words'
import './Header.css'
import styles from './Actors.css'
import './ModelStyle.css'

var axios = require('axios');


{/* Responsible for all styling on the page */}
var panelColor = {
    backgroundColor: 'black',
    borderColor: 'white',
}

var linkColor = {
    color: 'white',
    textAlign: 'center',
}

var dropdownStyle = {
    margin: '10px',
    backgroundColor: '#2b2b2b',
    borderColor: '#2b2b2b',
    color: 'white',
}

{/* Used to split the movies data so there is 3 per row */
}

function splitarray(input, spacing) {
    var output = [];

    for (var i = 0; i < input.length; i += spacing) {
        output[output.length] = input.slice(i, i + spacing);
    }
    return output;
}

class Movies extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelectSort = this.handleSelectSort.bind(this);
        this.handleSelectDirection = this.handleSelectDirection.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelectFilter = this.handleSelectFilter.bind(this);
        this.handleResetFilter = this.handleResetFilter.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.updateItems = this.updateItems.bind(this);

        this.state = this.getInitialState();
        this.updateItems();
    }

    getInitialState() {
        return {
            search_string: '',
            movies: [],
            moviesGrouped: [],
            numPages: 1,
            activePage: 1,
            resultsPerPage: 6,
            orderBy: 'name',
            orderDirection: 'asc',
            q: {
                'order_by': [{"field": "title", "direction": "asc"}],
                'filters': [{"name": "poster_path", "op": "is_not_null"}]
            }
        };
    }

    //* Rerenders/updates the page to get the new data triggered by pagination, sorting, etc */
    updateItems() {
        var url = 'http://marvelus.me/api/movie';
        var params = {
            results_per_page: this.state.resultsPerPage,
            page: this.state.activePage,
            q: JSON.stringify(this.state.q),
        };
        if (this.state.search_string.length > 0) {
            url = 'http://marvelus.me/api/search/movie';
            params['query'] = this.state.search_string;
        }
        axios.get(url, {
            params: params
        }).then(res => {
            this.state.numPages = res.data.total_pages;
            const movies = res.data.objects.map(movie => movie);
            const moviesGrouped = splitarray(movies, 3)
            this.setState({moviesGrouped});
        });
    }

    //* When you select a page in the pagination bar */
    handleSelect(eventKey) {
        this.state.activePage = eventKey;
        this.updateItems();
    }

    //* Select how to sort (what attributes) the actors */
    handleSelectSort(eventKey) {
        this.state.q.order_by[0].field = eventKey;
        this.updateItems()
    }

    /* Select which way to sort the attributes (asc/desc) */
    handleSelectDirection(eventKey) {
        this.state.q.order_by[0].direction = eventKey;
        this.updateItems();
    }

    /* Select which filter to use */
    handleSelectFilter(eventKey) {
        if(eventKey == "lang") {
            this.state.q.filters.push({"name": eventKey, "op": "equals", "val":"en"});            
        } else { 
            this.state.q.filters.push({"name": eventKey, "op": "gte", "val":7});            
        }
        this.updateItems();
    }

    /* Resets all options to the way when user first came to site */
    handleResetFilter() {
        this.state.q.filters = [{"name": "poster_path", "op": "is_not_null"}];
        this.updateItems();
    }
    
     /* Live change as user types into search bar */
    handleSearchChange(eventKey) {
        this.state.search_string = eventKey.target.value;
        this.updateItems()
    }

    /* Displays the "sort by" dropdown */
    renderDropdownButtonSortby(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} key={"name"} id={'dropdown-basic-${i}'}
                            onSelect={this.handleSelectSort}>
                <MenuItem eventKey="title">Title</MenuItem>
                <MenuItem eventKey="rating">Rating</MenuItem>


            </DropdownButton>
        );
    }

    /* Displays the "filter" dropdown */
    renderDropdownButtonFilter(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} key={"name"} id={'dropdown-basic-${i}'}
                            onSelect={this.handleSelectFilter}>
                <MenuItem eventKey="lang">In English</MenuItem>
                <MenuItem eventKey="rating">7+ star Rating</MenuItem>

            </DropdownButton>
        );
    }

    /* Displays the "order" dropdown */
    renderDropdownButtonSortDirection(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} onSelect={this.handleSelectDirection}>
                <MenuItem eventKey="asc">Ascending</MenuItem>
                <MenuItem eventKey="desc">Descending</MenuItem>
            </DropdownButton>
        );
    }

    /* Displays the "reset filter" button */
    renderResetFilterButton(title) {
        return (
            <Button style={dropdownStyle} title={title} onClick={this.handleResetFilter}>Reset Filter
            </Button>
        );
    }

    render() {
        return (
            <div className="container" styles="margin-top:100px;">
                <div className="row">
                    {/* Display all sorting, filtering, searching options */}
                    <div className='text-center'>
                        <Form inline>
                            {this.renderDropdownButtonSortby("Sort By: ", "name")}
                            {this.renderDropdownButtonSortDirection("Order", "")}
                            {this.renderDropdownButtonFilter("Filter", "")}
                            {this.renderResetFilterButton("Filter")}
                            <FormGroup controlId="formBasicText">
                                <FormControl
                                    type="text"
                                    placeholder="Search Movies..."
                                    onChange={this.handleSearchChange}/>
                            </FormGroup>
                         </Form>
                    </div>
                </div>

                {/* Go through and display 6 movies per page */}
                {this.state.moviesGrouped.length == 0 || !this.state.moviesGrouped ? null :
                    this.state.moviesGrouped.map(moviesList =>
                        !moviesList ? null :
                            <div className="row">
                                {moviesList.map((movie, i) =>
                                    <div className="col-sm-4">
                                        <Link to={"/movie/" + movie.id}>
                                            <div className="panel" style={panelColor}>
                                                <div className="panel-heading">
                                                    <div style={linkColor}>
                                                        {/* For movie search -- highlights the word found */}
                                                           <Highlighter
                                                                highlightClassName={styles.Highlight}
                                                                searchWords={this.state.search_string.split(" ")}
                                                                autoEscape={true}
                                                                textToHighlight={movie.title}
                                                            /> 
                                                    </div>
                                                </div>
                                                {/* In charge of the popover when you hover over the movies's picture */}
                                                <OverlayTrigger trigger={['hover', 'focus']}
                                                                placement={i === 0 ? "right" : "left"}
                                                                overlay={<Popover id="popover-trigger-hover-focus">
                                                                    <strong><u>{movie.title}</u></strong>
                                                                    <br/><br/>
                                                                    <strong>Rating: </strong>
                                                                    {movie.rating}<br/>
                                                                    <strong>Release Date: </strong>
                                                                    {movie.release_date}<br/>
                                                                    <strong>Runtime: </strong>
                                                                    {movie.runtime}<br/>
                                                                    <strong>Language: </strong>
                                                                    {movie.lang}<br/>
                                                                    <strong>Character(s): </strong><br/>
                                                                    <ul>
                                                                        {movie.characters.length > 0 ? movie.characters.map(function (character) {
                                                                            return (<li>{character.name}</li>)
                                                                        }) : "None"}</ul>


                                                                </Popover>}>
                                                    <div className="panel-body">

                                                        <img
                                                            src={"http://image.tmdb.org/t/p/w500" + movie.poster_path}
                                                            className="img-responsive"
                                                            alt="Image"/>

                                                    </div>
                                                </OverlayTrigger>
                                                <div className="panel-footer" style={{backgroundColor: 'black', color: 'white'}}>
                                                    Marvel Characters: {movie.characters.length}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>)

                }
                {/* Display the pagination bar */}
                <div className='text-center'>
                    {!this.state.numPages
                        ? null
                        : <Pagination
                            bsSize='large'
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={this.state.numPages}
                            maxButtons={10}
                            activePage={this.state.activePage}
                            onSelect={this.handleSelect}/>
                    }
                </div>
            </div>
        );
    }

}

export default Movies
