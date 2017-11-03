import React, {PropTypes} from 'react'
import {Link} from 'react-router-dom'
import {DropdownButton, MenuItem, Pagination} from 'react-bootstrap'

var axios = require('axios');

var imageStyles = {
    height: '500px',
}


class Actors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actors: [],
            numPages: 1,
            activePage: 1,
            resultsPerPage: 6,
            orderBy: 'name',
            orderDirection: 'asc',
            q: {'order_by': [{"field": "name", "direction": "asc"}]}
        }
        this.handleSelectSort = this.handleSelectSort.bind(this);
        this.handleSelectDirection = this.handleSelectDirection.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.updateItems = this.updateItems.bind(this);
    }


    componentDidMount() {
        this.updateItems();
    }

    updateItems() {
        axios.get('http://marvelus.me/api/actor', {
            params: {
                results_per_page: this.state.resultsPerPage,
                page: this.state.activePage,
                q: JSON.stringify(this.state.q),
            }
        }).then(res => {
            this.state.numPages = res.data.total_pages;
            const actors = res.data.objects.map(actor => actor);
            this.setState({actors});

        });
    }

    handleSelect(eventKey) {

        this.setState({
            activePage: eventKey,
        });
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

    renderDropdownButtonSortby(title, i) {
        return (
            <DropdownButton bsStyle="primary" title={title} key={"name"} id={`dropdown-basic-${i}`}
                            onSelect={this.handleSelectSort}>
                <MenuItem eventKey="name">Name</MenuItem>
                <MenuItem eventKey="birthday">Birthday</MenuItem>

            </DropdownButton>
        );
    }

    renderDropdownButtonSortDirection(title, i) {
        return (
            <DropdownButton bsStyle="primary" title={title} onSelect={this.handleSelectDirection}>
                <MenuItem eventKey="asc">Ascending</MenuItem>
                <MenuItem eventKey="desc">Descending</MenuItem>
            </DropdownButton>
        );
    }


    render() {

        return (

            <div className="container" styles="margin-top:100px;">
                <div className="row">
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

                        {this.renderDropdownButtonSortby("Sort By: ", "name")}
                        {this.renderDropdownButtonSortDirection("Order", "")}
                    </div>
                </div>
                <div className="row">
                    {this.state.actors.map(actor =>
                        <div className="col-sm-4">
                            <div className="panel panel-info">
                                <div className="panel-heading"><Link to={"/actor/" + actor.id}>{actor.name}</Link></div>
                                <div className="panel-body"><img src={"https://image.tmdb.org/t/p/w640/" + actor.image}
                                                                 className="img-responsive" style={imageStyles}
                                                                 alt="Image"/></div>
                            </div>
                        </div>
                    )}


                </div>

            </div>
        );
    }
}

export default Actors
