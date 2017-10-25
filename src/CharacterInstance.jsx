import React from 'react'
import { Link } from 'react-router-dom'


export default class CharacterInstance extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {
            character: {
                desc: "", name:"", stories:"", thumbnail: ""
            }
        }
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/character/' + this.id)
            .then((data) => {
                this.setState({character: data});
            });
    }

    render() {

        return(
            <div className="container">

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h1 className="panel-title">{this.state.character.name}</h1>
                    </div>
                    <div className="panel-body">
                        <img src ={this.state.character.thumbnail}/>
                        <h5>Description: </h5>
                        <p>{this.state.character.desc}</p>
                        <h5>Stories: </h5>
                        <p>{this.state.character.stories}</p>
                    </div>
                </div>
            </div>

            );
    }
}
