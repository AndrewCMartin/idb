import React from 'react'
import {Link} from 'react-router-dom'
import {Button, DropdownButton, MenuItem, Pagination,FormGroup, FormControl} from 'react-bootstrap'
import {browserHistory, withRouter} from 'react-router'


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(eventKey) {
        this.setState({input: eventKey.target.value});
    }

    handleSubmit(eventKey) {
        eventKey.preventDefault();
        var endPoint = this.state.input;
        this.props.history.push("/search?q=" + endPoint);

    }

    render() {
        return (

            
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="formBasicText">
                    <FormControl type="text"
                                 value={this.state.input}
                                 placeholder="Search..."
                                 onChange={this.handleChange} />
            
                    <FormControl.Feedback />
               </FormGroup>
            </form>
            </div>


        );
    }
}

export default withRouter(SearchBar);