import React, {PropTypes} from 'react'
import {Link} from 'react-router-dom'
import {
    Button,
    DropdownButton,
    Form,
    FormControl,
    FormGroup,
    MenuItem,
    OverlayTrigger,
    Pagination,
    Popover
} from 'react-bootstrap'
import Highlighter from 'react-highlight-words'
import './Header.css'
import styles from './Actors.css'


import './ModelStyle.css'


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

class Actors extends React.Component {
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
            actors: [],
            actorsGrouped: [],
            numPages: 1,
            activePage: 1,
            resultsPerPage: 6,
            orderBy: 'name',
            orderDirection: 'asc',
            q: {
                'order_by': [{"field": "name", "direction": "asc"}],
                'filters': [{"name": "image", "op": "is_not_null"}]
            }
        };
    }

    // componentDidMount() {
    //     this.updateItems();
    // }

    updateItems() {
        console.log("update");
        var url = 'http://marvelus.me/api/actor';
        var params = {
            results_per_page: this.state.resultsPerPage,
            page: this.state.activePage,
            q: JSON.stringify(this.state.q),
        };
        if (this.state.search_string.length > 0) {
            url = 'http://marvelus.me/api/search/actor';
            params['query'] = this.state.search_string;

        }
        axios.get(url, {
            params: params
        }).then(res => {
            this.state.numPages = res.data.total_pages;
            const actors = res.data.objects.map(actor => actor);
            //this.setState({actors});
            const actorsGrouped = splitarray(actors, 3)
            this.setState({actorsGrouped});
            console.log(this.state.actorsGrouped);
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
        this.state.q.filters.push({"name": "id", "op": "gt", "val": 9860});
        this.updateItems();
    }

    handleResetFilter() {
        this.state.q.filters = [{"name": "image", "op": "is_not_null"}];
        this.state.search_string = '';
        this.updateItems();
    }

    handleSearchChange(eventKey) {
        this.state.search_string = eventKey.target.value;
        this.updateItems()
    }

    renderDropdownButtonSortby(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} key={"sort"} id={'dropdown-basic-${i}'}
                            onSelect={this.handleSelectSort}>
                <MenuItem eventKey="name">Name</MenuItem>
                <MenuItem eventKey="birthday">Birthday</MenuItem>

            </DropdownButton>
        );
    }

    renderDropdownButtonFilter(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} key={"filter"} id={'dropdown-basic-${i}'}
                            onSelect={this.handleSelectFilter}>
                <MenuItem eventKey="name">ID greater than 9860</MenuItem>
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
                        <Form inline>
                            {this.renderDropdownButtonSortby("Sort By: ", "name")}
                            {this.renderDropdownButtonSortDirection("Order", "")}
                            {this.renderDropdownButtonFilter("Filter", "")}
                            {this.renderResetFilterButton("Filter")}
                            <FormGroup controlId="formBasicText">
                                <FormControl
                                    type="text"
                                    placeholder="Search..."
                                    onChange={this.handleSearchChange}/>
                            </FormGroup>
                        </Form>
                    </div>
                </div>

                <form>

                </form>


                {this.state.actorsGrouped.length == 0 || !this.state.actorsGrouped ? null :
                    this.state.actorsGrouped.map(actorList =>
                        !actorList ? null :
                            <div className="row">{actorList.map(actor =>
                                <div className="col-sm-4">
                                    <Link to={"/actor/" + actor.id}>
                                          <div className="panel" style={panelColor}>
                                            <div className="panel-heading">
                                                <div style={linkColor}>
                                                    <Highlighter
                                                        highlightClassName={styles.Highlight}
                                                        searchWords={this.state.search_string.split(" ")}
                                                        autoEscape={true}
                                                        textToHighlight={actor.name}
                                                    />
                                                </div>
                                            </div>

                                            <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={<Popover id="popover-trigger-hover-focus">
                                               <strong>Name: </strong><br />
                                               {actor.name}<br /><br />
                                               <strong>Birthday: </strong><br />
                                               {actor.birthday}<br /><br />
                                               <strong>Character(s): </strong><br />
                                               {actor.characters.length > 0 ? actor.characters.map(function (character) {
                                                    return (character.name)
                                                }) : "None"}<br /><br />
                                                <strong>Movies: </strong><br />
                                                {actor.movies.length > 0 ? actor.movies.map(function (movie) {
                                                    return (movie.title)
                                                }) : "None"}<br /><br />
                                                <strong>TV Shows: </strong><br />
                                                {actor.tvshows.length > 0 ? actor.tvshows.map(function (show) {
                                                    return (show.title)
                                                }) : "None"}


                                            </Popover>}>


                                                <div className="panel-body">


                                                    <img
                                                    src={"https://image.tmdb.org/t/p/w640/" + actor.image}
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

export default Actors
