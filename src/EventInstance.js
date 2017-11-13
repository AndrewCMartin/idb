import React from 'react'
import { Link } from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
var axios = require('axios');

var containerStyle = {
    backgroundColor: 'black',
    margin:'auto',
    height: '100vh',  
}

var panelStyle = {
    backgroundColor: 'black',
    color: 'white',

}

var headingStyle= {
    color:'#d3d1d1',
    borderColor: 'white',
    textTransform: 'uppercase',
}

var imageStyle = {
    width: '400px',
    height: '600px',
}



var secColStyle = {
    textTransform: 'uppercase',
    textAlign: 'center',
    color:'#d3d1d1',
}
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
        const series = this.state.event.series || [];
        const characters = this.state.event.characters || [];

        return (
            <div class="container" style={containerStyle}>
                    <div class="panel" style={panelStyle} >
                        <div class="panel-heading" style={headingStyle}> <h1>{this.state.event.title}</h1> </div>
                        <div class="panel-body">
                            <div class="panel-body">
            <Row>
            <Col xs={5} md={5}>
            <img src={this.state.event.thumbnail} class="img-responsive" class="img-responsive" styles="width:100%" alt="Image" />
            </Col>
            <Col xs={7} md={7}>
                                
                 <h3 style={headingStyle}>Name</h3>
                 <p>{this.state.event.title}</p>
                 <h3 style={headingStyle}>Description</h3>
                 <p>{this.state.event.desc}</p>
                 <h3 style={headingStyle}>Start</h3>
                 <p>{this.state.event.start}</p>
                 <h3 style={headingStyle}>Creators</h3>
                 <p>{this.state.event.creators}</p>
            </Col>
            </Row>
            <hr></hr>
            <Row>
            <Col xs={6} md={6}>
                                    
                                        <h3 style={secColStyle}>Characters</h3>
                                        <ul> 
                                            {characters.length > 0 ? characters.map(function(character) {
        return (<li key={character.name}><Link to={`/character/${character.id}`} style={{color:'#ed2f2f', fontSize: '17px'}}>{character.name}</Link></li>)
					    }) : "None"}
                                        </ul>
                                    
           </Col>
           <Col xs={6} md={6}>
                                    
                                        <h3 style={secColStyle}>Comics Series</h3>
                                        <ul> 
                                            {series.length > 0 ? series.map(function(series_instance) {
        return (<li key={series_instance.title}><Link to={`/comic_series/${series_instance.id}`}style={{color:'#ed2f2f', fontSize: '17px'}} >{series_instance.title}</Link></li>)
					    }) : "None"}
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


export default EventInstance
