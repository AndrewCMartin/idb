import React from 'react'
import { Link } from 'react-router-dom'
var axios = require('axios');

var imageStyles = {
    width: '500px',
    height: '400px'
}
class Characters extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          characters: []
        };
    }
    
    componentDidMount() {
        return axios.get('http://marvelus.me/api/character?q=%7B%22filters%22%3A[%7B%22name%22%3A%22thumbnail%22%2C%22op%22%3A%22is_not_null%22%7D]%7D').then(res=> {
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
					 <div className="panel-body"><img src={character.thumbnail} className="img-responsive" style={imageStyles} alt="Image" /></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
}

export default Characters
