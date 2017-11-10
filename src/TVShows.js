import React from 'react'
import {Link} from 'react-router-dom'
import {Button, DropdownButton, MenuItem, OverlayTrigger, Pagination, Popover} from 'react-bootstrap'

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


{/* Used to split the tv show data so there is 3 per row */}
function splitarray(input, spacing) {
  var output = [];

  for (var i = 0; i < input.length; i += spacing) {
      output[output.length] = input.slice(i, i + spacing);
  }

  return output;
}
class TVShows extends React.Component{
  constructor(props){
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
        shows: [],
        showsGrouped: [],
        numPages: 1,
        activePage: 1,
        resultsPerPage: 6,
        orderBy: 'name',
        orderDirection: 'asc',
        q: {
            'order_by': [{"field": "name", "direction": "asc"}],
            'filters': [{"name": "poster_path", "op": "is_not_null"}]
        }
    };
}

//* Rerenders/updates the page to get the new data triggered by pagination, sorting, etc */
updateItems() {
    axios.get('http://marvelus.me/api/tv_show', {
        params: {
            results_per_page: this.state.resultsPerPage,
            page: this.state.activePage,
            q: JSON.stringify(this.state.q),
        }
    }).then(res => {
        this.state.numPages = res.data.total_pages;
        const shows = res.data.objects.map(show => show);
        const showsGrouped = splitarray(shows, 3)
        this.setState({showsGrouped});
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
    if(eventKey == "num_seasons") {
        this.state.q.filters.push({"name": eventKey, "op": "gt", "val":1});        
    } else {
        this.state.q.filters.push({"name": eventKey, "op": "is_not_null"});
    }    this.updateItems();
}

/* Resets all options to the way when user first came to site */
handleResetFilter() {
    this.state.q.filters = [{"name": "poster_path", "op": "is_not_null"}];
    this.updateItems();
}

/* Displays the "sort by" dropdown */
renderDropdownButtonSortby(title, i) {
    return (
        <DropdownButton style={dropdownStyle} title={title} key={"name"} id={'dropdown-basic-${i}'}
                        onSelect={this.handleSelectSort}>
            <MenuItem eventKey="name">Title</MenuItem>
            <MenuItem eventKey="rating">Rating</MenuItem>

        </DropdownButton>
    );
}

/* Displays the "filter" dropdown */
renderDropdownButtonFilter(title, i) {
    return (
        <DropdownButton style={dropdownStyle} title={title} key={"name"} id={'dropdown-basic-${i}'}
                        onSelect={this.handleSelectFilter}>
                    <MenuItem eventKey="num_seasons">Ran for more than 1 season</MenuItem>
                    <MenuItem eventKey="characters">Has Characters</MenuItem>

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
    return(
        <div className="container" styles="margin-top:100px;">
          <div className="row">
              {/* Display all sorting, filtering, searching options */}
              <div className='text-center'>
                  {this.renderDropdownButtonSortby("Sort By: ", "name")}
                  {this.renderDropdownButtonSortDirection("Order", "")}
                  {this.renderDropdownButtonFilter("Filter", "")}
                  {this.renderResetFilterButton("Filter")}
              </div>
          </div>
        
        {/* Go through and display 6 tv shows per page */}
        {this.state.showsGrouped.length == 0 || !this.state.showsGrouped ? null :
            this.state.showsGrouped.map(showsList =>
                !showsList ? null :
                <div className="row">
                {showsList.map((show, i) =>
                    <div className="col-sm-4">
                        <Link to={"/tvshow/" + show.id}>
                            <div className="panel" style={panelColor}>
                                <div className="panel-heading">
                                    <div style={linkColor}>{show.name}</div>
                                    {/* For tv show search -- highlights the word found */}
                                </div>
                                 {/* In charge of the popover when you hover over the tv shows's picture */}       
                                 <OverlayTrigger trigger={['hover', 'focus']} 
                                                 placement={i === 0 ? "right" : "left"} 
                                                 overlay={<Popover id="popover-trigger-hover-focus">
                                               <strong><u>{show.name}</u></strong>
                                               <br /><br />
                                               <strong>Rating: </strong>
                                               {show.rating}<br />
                                               <strong># of Seasons: </strong>
                                               {show.num_seasons}<br />
                                               <strong># of Episodes: </strong>
                                               {show.num_episodes}<br />
                                               <strong>Last Air Date: </strong>
                                               {show.last_air_date}<br />
                                               <strong>Character(s): </strong><br />
                                               <ul>    
                                               {show.characters.length > 0 ? show.characters.map(function (character) {
                                                    return (<li>{character.name}</li>)
                                                }) : "None"}
                                               </ul>

                                            </Popover>}>
                                        
                                <div className="panel-body">

                                    <img
                                        src={"http://image.tmdb.org/t/p/w500" + show.poster_path}
                                        className="img-responsive"
                                        alt="Image"/>

                                </div>
                               </OverlayTrigger>
                               <div className="panel-footer" style={{backgroundColor: 'black', color: 'white'}}>
                                   Marvel Characters: {show.characters.length}
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

export default TVShows
