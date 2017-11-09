import React from 'react'
import { Link } from 'react-router-dom'
import {Button, DropdownButton, MenuItem, Pagination, OverlayTrigger, Popover} from 'react-bootstrap'

var axios = require('axios');

var imageStyles = {
    //height: '500px',
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
        this.updateItems = this.updateItems.bind(this);

        this.state = this.getInitialState();
        this.updateItems();
    }

    getInitialState() {
        return {
            movies: [],
            moviesGrouped: [],
            numPages: 1,
            activePage: 1,
            resultsPerPage: 6,
            orderBy: 'name',
            orderDirection: 'asc',
            q: {
                'order_by': [{"field": "title", "direction": "asc"}],
                'filters': []
            }
        };
    }

    updateItems() {
        console.log("update");
        axios.get('http://marvelus.me/api/movie', {
            params: {
                results_per_page: this.state.resultsPerPage,
                page: this.state.activePage,
                q: JSON.stringify(this.state.q),
            }
        }).then(res => {
            this.state.numPages = res.data.total_pages;
            const movies = res.data.objects.map(movie => movie);
            const moviesGrouped = splitarray(movies, 3)
            this.setState({moviesGrouped});
            console.log(this.state.moviesGrouped);
        });
    }

    handleSelect(eventKey) {
        this.state.activePage = eventKey;
        this.updateItems();
    }

    handleSelectSort(eventKey) {
        // this.state.orderBy = eventKey;
        this.state.q.order_by[0].field = eventKey;
        this.updateItems()

    }

    handleSelectDirection(eventKey) {
        // this.state.orderDirection = eventKey;
        this.state.q.order_by[0].direction = eventKey;
        this.updateItems();
    }

    handleSelectFilter(eventKey) {
        this.state.q.filters.push({"name": eventKey, "op": "is_not_null"});
        this.updateItems();
    }

    handleResetFilter() {
        this.state.q.filters = [{"name": "image", "op": "is_not_null"}];
        this.updateItems();
    }

    renderDropdownButtonSortby(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} key={"name"} id={'dropdown-basic-${i}'}
                            onSelect={this.handleSelectSort}>
                <MenuItem eventKey="name">Name</MenuItem>
                <MenuItem eventKey="birthday">Birthday</MenuItem>

            </DropdownButton>
        );
    }

    renderDropdownButtonFilter(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} key={"name"} id={'dropdown-basic-${i}'}
                            onSelect={this.handleSelectFilter}>
                <MenuItem eventKey="desc">Has Description</MenuItem>
                <MenuItem eventKey="birthday">Appears In TV Show(s)</MenuItem>

            </DropdownButton>
        );
    }

    renderDropdownButtonSortDirection(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} onSelect={this.handleSelectDirection}>
                <MenuItem eventKey="asc">Ascending</MenuItem>
                <MenuItem eventKey="desc">Descending</MenuItem>
            </DropdownButton>
        );
    }

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

                    <div className='text-center'>
                        {this.renderDropdownButtonSortby("Sort By: ", "name")}
                        {this.renderDropdownButtonSortDirection("Order", "")}
                        {this.renderDropdownButtonFilter("Filter", "")}
                        {this.renderResetFilterButton("Filter")}
                    </div>
                </div>
                {this.state.moviesGrouped.length == 0 || !this.state.moviesGrouped ? null :
                    this.state.moviesGrouped.map(moviesList =>
                        !moviesList ? null :
                        <div className="row">
                        {moviesList.map(movie =>
                            <div className="col-sm-4">
                                <Link to={"/movie/" + movie.id}>
                                    <div className="panel" style={panelColor}>
                                        <div className="panel-heading">
                                            <div style={linkColor}>{movie.title}</div>
                                        </div>
                                         <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={<Popover id="popover-trigger-hover-focus">
                                               <strong>Name: </strong><br />
                                               {movie.name}<br /><br />
                                               <strong>Character(s): </strong><br />
                                               {movie.characters.length > 0 ? movie.characters.map(function (character) {
                                                    return (character.name)
                                                }) : "None"}<br /><br />


                                            </Popover>}>
                                        <div className="panel-body">

                                            <img
                                                src={"http://image.tmdb.org/t/p/w500" + movie.poster_path}
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
