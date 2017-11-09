import React from 'react'
import { Link } from 'react-router-dom'
import {Button, DropdownButton, MenuItem, Pagination, OverlayTrigger, Popover} from 'react-bootstrap'

var axios = require('axios');


{/* Responsible for all styling on the page */}
var imageStyles = {
    width:'450px',
    height: '450px',
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

{/* Used to split the series data so there is 3 per row */}
function splitarray(input, spacing) {
  var output = [];

  for (var i = 0; i < input.length; i += spacing) {
      output[output.length] = input.slice(i, i + spacing);
  }
  return output;
}

class ComicSeries extends React.Component{
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
        comics: [],
        comicsGrouped: [],
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

//* Rerenders/updates the page to get the new data triggered by pagination, sorting, etc */
updateItems() {
    axios.get('http://marvelus.me/api/comic_series', {
        params: {
            results_per_page: this.state.resultsPerPage,
            page: this.state.activePage,
            q: JSON.stringify(this.state.q),
        }
    }).then(res => {
        this.state.numPages = res.data.total_pages;
        const comics = res.data.objects.map(comic => comic);
        const comicsGrouped = splitarray(comics, 3)
        this.setState({comicsGrouped});
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
        {/* Display all sorting, filtering, searching options */}
                <div className='text-center'>
                    {this.renderDropdownButtonSortby("Sort By: ", "name")}
                    {this.renderDropdownButtonSortDirection("Order", "")}
                    {this.renderDropdownButtonFilter("Filter", "")}
                    {this.renderResetFilterButton("Filter")}
                </div>
            </div>
                
                
                {/* Go through and display 6 series per page */}
            {this.state.comicsGrouped.length == 0 || !this.state.comicsGrouped ? null :
                this.state.comicsGrouped.map(comicsList =>
                    !comicsList ? null :
                    <div className="row">
                    {comicsList.map((comic, i) =>
                        <div className="col-sm-4">
                            <Link to={"/comic_series/" + comic.id}>
                                <div className="panel" style={panelColor}>
                                    <div className="panel-heading">
                                        <div style={linkColor}>{comic.title}</div>
                                    </div>
                                    
                                             {/* In charge of the popover when you hover over the comic's picture */}
                                    <OverlayTrigger trigger={['hover', 'focus']} 
                                                    placement={i === 0 ? "right" : "left"} 
                                                    overlay={<Popover id="popover-trigger-hover-focus">
                                               <strong><u>{comic.title}</u></strong>
                                               <br /><br />
                                               <strong>Rating: </strong>
                                               {comic.rating}<br />
                                               <strong>Start Year: </strong> 
                                               {comic.start_year}<br />
                                               <strong>End Year: </strong>   
                                               {comic.end_year}<br />    
                                               <strong># of Events: </strong>   
                                               {comic.events}<br />     
                                               <strong>Character(s): </strong><br />
                                               <ul>{comic.characters.length > 0 ? comic.characters.map(function (character) {
                                                    return (<li>{character.name}</li>)
                                                }) : "None"}</ul>


                                            </Popover>}>         
                                             
                                    
                                    <div className="panel-body">

                                        <img
                                            src={comic.thumbnail}
                                            className="img-responsive" style={imageStyles}
                                            alt="Image"/>

                                    </div>
                                    </OverlayTrigger>
                                    <div className="panel-footer">
                                        Marvel Characters: {comic.characters.length}
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

export default ComicSeries
