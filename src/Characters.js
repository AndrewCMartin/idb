import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

class Characters extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          characters: []
        };
    }
    
    componentDidMount() {
        return axios.get('http://marvelus.me/api/character?q=%7B%22limit%22:9%7D').then(res=> {
            const characters = res.data.objects.map(character => character)
            this.setState({characters});
        });
    }

    render() {
        return (
            <div className="container" styles="margin-top:100px;">
            <div className="row">
              {this.state.characters.map(character =>
                <div className="col-sm-4">
                  <div className="panel panel-info">
                    <div className="panel-heading"><Link to={"/character/" + character.id}>{character.name}</Link></div>
                    <div className="panel-body"><img src={character.thumbnail} className="img-responsive" styles="width:100%" alt="Image" /></div>
                    <div className="panel-footer">{character.name}'s stories: {character.stories}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
}

export default Characters