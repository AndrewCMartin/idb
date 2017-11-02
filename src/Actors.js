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
            orderBy: 'name',
            orderDirection: 'asc',
        }
        this.handleSelectSort = this.handleSelectSort.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSortDirection = this.handleSortDirection(this);

    }


    componentDidMount() {
        var queryParams = encodeURI({
            "order_by": [{
                "field": this.state.orderBy,
                "direction": this.state.orderDirection
            }]
        })
        return axios.get('http://marvelus.me/api/actor', {
            params: {
                results_per_page: 6,
                page: this.state.activePage,
                q: queryParams
            }
        }).then(res => {
            this.state.numPages = res.data.total_pages;
            const actors = res.data.objects.map(actor => actor)
            this.setState({actors});
        });
    }

    handleSelect(eventKey) {

        this.setState({
            activePage: eventKey,
        });

        axios.get('http://marvelus.me/api/actor', {
            params: {
                results_per_page: 6,
                page: this.state.activePage,
                q: {"order_by": [{"field": this.state.orderBy, "direction": this.state.orderDirection}]}
            }
        }).then(res => {
            const actors = res.data.objects.map(actor => actor);
            this.setState({actors});

        });
    }

    handleSelectSort(eventKey) {
        this.state.orderBy = eventKey;
        axios.get('http://marvelus.me/api/actor', {
            params: {
                results_per_page: 6,
                page: this.state.activePage,
                q: {"order_by": [{"field": this.state.orderBy, "direction": this.state.orderDirection}]}
            }
        }).then(res => {
            const actors = res.data.objects.map(actor => actor);
            this.setState({actors});
        });

    }

    handleSortDirection(eventKey) {
        this.state.orderDirection = eventKey;
        axios.get('http://marvelus.me/api/actor', {
            params: {
                results_per_page: 6,
                page: this.state.activePage,
                q: {"order_by": [{"field": this.state.orderBy, "direction": this.state.orderDirection}]}
            }
        }).then(res => {
            const actors = res.data.objects.map(actor => actor);
            this.setState({actors});
        })

    }

    renderDropdownButtonSortby(title, i) {
        return (
            <DropdownButton bsStyle="primary" title={title} key={"name"} id={`dropdown-basic-${i}`}
                            onSelect={this.handleSelectSort}>
                <MenuItem eventKey="name">Name</MenuItem>
                <MenuItem eventKey="birthday">Age</MenuItem>

            </DropdownButton>
        );
    }

    renderDropdownButtonSortDirection(title, i) {
        return (
            <DropdownButton bsStyle="primary" title={title} onSelect={this.handleSortDirection}>
                <MenuItem eventKey="asc">Ascending</MenuItem>
                <MenuItem eventKey="desc">Descending</MenuItem>
            </DropdownButton>
        );
    }


    render() {

        return (

            <div className="container" styles="margin-top:100px;">

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
