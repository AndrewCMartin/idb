import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

class EventInstance extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          event: {}
        };
    }

    componentDidMount() {
        return axios.get("http://marvelus.me/api/event/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1) ).then(res=> {
            const event = res.data;
            console.log(event);
            this.setState({event});
        });
    }

    render() {
        return (
            <div class="container" styles="margin: auto; margin-top:100px; width: 500px">
                    <div class="panel panel-default" >
                        <div class="panel-heading"> <h1>{this.state.event.title}</h1> </div>
                        <div class="panel-body">
                            <div class="panel-body"><img src={this.state.event.thumbnail} class="img-responsive" class="img-responsive" styles="width:100%" alt="Image" />
                                <h3>Information</h3>
                                <ul>
                                    <li><b>Name:</b> {this.state.event.title}</li>
                                    <li><b>Description:</b> {this.state.event.desc}</li>
                                    <li><b>Start:</b> {this.state.event.start}</li>
                                    <li><b>Creators: </b> {this.state.event.creators}</li>
                                    <li>
                                        <b>Characters:</b>
                                        <ul> 
                                            <li>{this.state.event.title}</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Comics:</b>
                                        <ul> 
                                            <li>{this.state.event.title}</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
        </div>

        );

    }
}


export default EventInstance