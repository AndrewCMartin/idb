import React from 'react'
import { Link } from 'react-router-dom'
import {Button, DropdownButton, MenuItem, Pagination, OverlayTrigger, Popover} from 'react-bootstrap'
import './Header.css'
import './ModelStyle.css'
    
var axios = require('axios');

{/* Responsible for all styling on the page */}
var imageStyles = {
    width: '500px',
    height: '400px'
}

var panelColor = {
    backgroundColor: 'black',
    borderColor: 'white',
}

var linkColor = {
    color: 'white',
}

var dropdownStyle = {
    margin: '10px',
    backgroundColor: '#2b2b2b',
    borderColor: '#2b2b2b',
    color: 'white',
}

var linkColor = {
    color: 'white',
}

{/* Used to split the actor data so there is 3 per row */}
function splitarray(input, spacing) {
    var output = [];

    for (var i = 0; i < input.length; i += spacing) {
        output[output.length] = input.slice(i, i + spacing);
    }
    return output;
}

class Characters extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectSort = this.handleSelectSort.bind(this);
        this.handleSelectDirection = this.handleSelectDirection.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelectFilter = this.handleSelectFilter.bind(this);
        this.handleResetFilter = this.handleResetFilter.bind(this);
        this.updateItems = this.updateItems.bind(this);

        this.state = this.getInitialState();
        this.updateItems();
    }

    getInitialState() {
        return {
            characters: [],
            charactersGrouped: [],
            numPages: 1,
            activePage: 1,
            resultsPerPage: 6,
            orderBy: 'name',
            orderDirection: 'asc',
            q: {
                'order_by': [{"field": "name", "direction": "asc"}],
                'filters': []
            }
        };
    }
    
    //* Rerenders/updates the page to get the new data triggered by pagination, sorting, etc */
    updateItems() {
        axios.get('http://marvelus.me/api/character', {
            params: {
                results_per_page: this.state.resultsPerPage,
                page: this.state.activePage,
                q: JSON.stringify(this.state.q),
            }
        }).then(res => {
            this.state.numPages = res.data.total_pages;
            const characters = res.data.objects.map(character => character);
            const charactersGrouped = splitarray(characters, 3)
            this.setState({charactersGrouped});
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
        this.state.q.filters.push({"name": eventKey, "op": "is_not_null"});
        this.updateItems();
    }

    /* Resets all options to the way when user first came to site */
    handleResetFilter() {
        this.state.q.filters = [{"name": "image", "op": "is_not_null"}];
        this.updateItems();
    }

    /* Displays the "sort by" dropdown */
    renderDropdownButtonSortby(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} key={"name"} id={'dropdown-basic-${i}'}
                            onSelect={this.handleSelectSort}>
                <MenuItem eventKey="name">Name</MenuItem>
                <MenuItem eventKey="birthday">Birthday</MenuItem>

            </DropdownButton>
        );
    }

    /* Displays the "filter" dropdown */
    renderDropdownButtonFilter(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} key={"name"} id={'dropdown-basic-${i}'}
                            onSelect={this.handleSelectFilter}>
                <MenuItem eventKey="desc">Has Description</MenuItem>
                <MenuItem eventKey="birthday">Appears In TV Show(s)</MenuItem>

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
                    /* Display all sorting, filtering, searching options */
                    <div className='text-center'>
                        {this.renderDropdownButtonSortby("Sort By: ", "name")}
                        {this.renderDropdownButtonSortDirection("Order", "")}
                        {this.renderDropdownButtonFilter("Filter", "")}
                        {this.renderResetFilterButton("Filter")}
                    </div>
                </div>
                      
                /* Go through and display 6 actors per page */
                {this.state.charactersGrouped.length == 0 || !this.state.charactersGrouped ? null :
                    this.state.charactersGrouped.map(charactersList =>
                        !charactersList ? null :
                        <div className="row">
                        {charactersList.map(character =>
                            <div className="col-sm-4">
                                <Link to={"/character/" + character.id}>
                                    <div className="panel" style={panelColor}>
                                        <div className="panel-heading">
                                            <div style={linkColor}>{character.name}</div>
                                        </div>
                                                     
                                                     
                                        /* In charge of the popover when you hover over the actor's picture */             
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={<Popover id="popover-trigger-hover-focus">
                                               <strong>Name: </strong><br />
                                               {character.name}<br /><br />
                                               <strong>Stories: </strong><br />
                                               {character.stories}<br /><br />
                                                <strong>Movies: </strong><br />
                                                {character.movies.length > 0 ? character.movies.map(function (movie) {
                                                    return (movie.title)
                                                }) : "None"}<br /><br />
                                                <strong>TV Shows: </strong><br />
                                                {character.tvshows.length > 0 ? character.tvshows.map(function (show) {
                                                    return (show.title)
                                                }) : "None"}


                                            </Popover>}>

                                        <div className="panel-body">

                                            <img
                                                src={character.thumbnail}
                                                className="img-responsive" style={imageStyles}
                                                alt="Image"/>

                                        </div>
                                        </OverlayTrigger>
                                    </div>
                                </Link>
                            </div>
                        )}
                        </div>)

                }

            
            /* Display the pagination bar */
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

export default Characters
