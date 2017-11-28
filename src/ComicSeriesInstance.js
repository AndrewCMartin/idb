import React from 'react'
import { Link } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import './instance.css'
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
            
            <div class="container"  style={{backgroundColor: 'black', margin: 'auto', height:'100vh'}}>
            <div class="instance">
                    <div class="panel" >
                        <div   class="panel-heading"> <h1>{this.state.comic_series.title}</h1> </div>
                        <div class="panel-body">
                            <Row>
                                <Col xs={5} md={5}>
                                    <img src={this.state.comic_series.thumbnail} class="img-responsive" class="img-responsive" styles="width:100%" alt="Image" />
                                </Col>
                                <Col xs={7} md={7}>
                                    <h3 >Description</h3>
                                    <p>{this.state.comic_series.desc}</p>
                                    <h3 >Start Year</h3>
                                    <p>{this.state.comic_series.start_year}</p>
                                    <h3 >End Year</h3>
                                    <p>{this.state.comic_series.end_year}</p>
                                    <h3 >Rating</h3>
                                    <p>{this.state.comic_series.rating}</p>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col xs={6} md={6}>
                                    <h4 >Characters</h4>
                                    <ul> 
                                        {characters.length > 0 ? characters.map(function(character){
                                    return (<li key={character.name}style={{color:'#d3d1d1'}}><Link to={`/character/${character.id}`}style={{color:'#ed2f2f', fontSize: '17px'}}>{character.name}</Link></li>)
                                    }) : <li>None</li>}
                                    </ul>
                                </Col>
                                <Col xs={6} md={6}>

                                    <h4 >Events:</h4>
                                    <ul> 
                                        {events.length > 0 ? events.map(function(event){
                                    return(<li key={event.title}style={{color:'#d3d1d1'}}><Link to={`/event/${event.id}`}style={{color:'#ed2f2f', fontSize: '17px'}}>{event.title}</Link></li>)
                                    }) : <li>None</li>}
                                    </ul>
                                </Col>
                            </Row>
                            </div>
                        </div>
                    </div>
        </div>
        );

    }
}


export default ComicSeriesInstance
