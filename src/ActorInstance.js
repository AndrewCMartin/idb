import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

class ActorInstance extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          actor: {}
        };
    }

    componentDidMount() {
        return axios.get("http://marvelus.me/api/actor/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1) ).then(res=> {
            const actor = res.data;
            console.log(actor);
            this.setState({actor});
        });
    }

    render() {
        return (
            <div class="container" styles="margin: auto; margin-top:100px; width: 500px">
                    <div class="panel panel-default" >
                        <div class="panel-heading"> <h1>{this.state.actor.name}</h1> </div>
                        <div class="panel-body">
                            <div class="panel-body"><img src={"https://image.tmdb.org/t/p/w640/" + this.state.actor.image} class="img-responsive" class="img-responsive" styles="width:100%" alt="Image" />
                                <h3>Information</h3>
                                <ul>
                                    <li><b>Name:</b> {this.state.actor.name}</li>
                                    <li><b>Bio:</b> {this.state.actor.bio}</li>
                                    <li><b>Birthday:</b> {this.state.actor.birthday}</li>
                                    <li><b>Character(s): </b> {this.state.actor.name}</li>
                                    <li>
                                        <b>Relevant Movies/TV Shows:</b>
                                        <ul> 
                                            <li>{this.state.actor.name}</li>
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


export default ActorInstance
