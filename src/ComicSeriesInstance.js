import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

class ComicSeriesInstance extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          comic_series: {}
        };
    }

    componentDidMount() {
        return axios.get("http://marvelus.me/api/comic_series/" + window.location.href.substring(window.location.href.lastIndexOf("/") + 1) ).then(res=> {
            const comic_series = res.data;
            console.log(comic_series);
            this.setState({comic_series});
        });
    }

    render() {
	const characters = this.state.comic_series.characters || [];
	const events = this.state.comic_series.events || [];
        return (
            <div class="container" styles="margin: auto; margin-top:100px; width: 500px">
                    <div class="panel panel-default" >
                        <div class="panel-heading"> <h1>{this.state.comic_series.title}</h1> </div>
                        <div class="panel-body">
                            <div class="panel-body"><img src={this.state.comic_series.thumbnail} class="img-responsive" class="img-responsive" styles="width:100%" alt="Image" />
                                <h3>Information</h3>
                                <ul>
                                    <li><b>Title:</b> {this.state.comic_series.title}</li>
                                    <li><b>Description:</b> {this.state.comic_series.desc}</li>
                                    <li><b>Start Year:</b> {this.state.comic_series.start_year}</li>
                                    <li><b>End Year: </b> {this.state.comic_series.end_year}</li>
                <li><b>Rating: </b>{this.state.comic_series.rating}</li>
                                    <li>
                                        <b>Characters:</b>
                                        <ul> 
            {characters.length > 0 ? characters.map(function(character){
		return (<li key={character.name}><Link to={`/character/${character.id}`}>{character.name}</Link></li>)
	    }) : "None"}
                                        </ul>
                                    </li>
                                    <li>
                                        <b>Events:</b>
                                        <ul> 
            {events.length > 0 ? events.map(function(event){
		return(<li key={event.title}><Link to={`/event/${event.id}`}>{event.title}</Link></li>)
	    }) : "None"}
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


export default ComicSeriesInstance
