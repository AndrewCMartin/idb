import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

class CharacterInstance extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            character: {},
	    actors: {}
        };
    }

    componentDidMount() {
        return axios.get("http://marvelus.me/api/character/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1) ).then(res=> {
            const character = res.data;
            console.log(character);
            this.setState({character});
        });
    }

    render() {
        return (
            <div class="container" styles="margin: auto; margin-top:100px; width: 500px">
                    <div class="panel panel-default" >
                        <div class="panel-heading"> <h1>{this.state.character.name}</h1> </div>
                        <div class="panel-body">
                            <div class="panel-body"><img src={this.state.character.thumbnail} class="img-responsive" class="img-responsive" styles="width:100%" alt="Image" />
                                <h3>Information</h3>
                                <ul>
                                    <li><b>Name:</b> {this.state.character.name}</li>
                                    <li><b>Description:</b> {this.state.character.desc}</li>
                                    <li><b>Stories:</b> {this.state.character.stories}</li>
                                    <li><b>Events:</b> {this.state.character.events}</li>
                                    <li>
                                        <b>Comic Series:</b>
                                        <ul> 
                                            <li>{this.state.character.series}</li>
                                        </ul>
                </li>
		{/*	<li><b>Actors:</b> {this.state.character.actors.map(actor => actor.id)}</li>
			<li><b>Movies:</b> {this.state.character.movies.map(movie=>movie.id)}</li>*/}
                                </ul>
                            </div>
                        </div>
                    </div>
        </div>

        );

    }
}


export default CharacterInstance
