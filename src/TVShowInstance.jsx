import React from 'react'
import { Link } from 'react-router-dom'


export default class TVShowInstance extends React.Component {
	constructor(props) {
		super(props);
		this.id = props.id;
		this.state = {
			tvshow: {
				name: [], num_episodes: [], num_seasons: [], overview: [], poster_path:[], rating: []
			}
		}
	}

	componentDidMount() {
		$.getJSON(document.location.origin + '/api/tvshow/' + this.id)
			.then((data) => {
				this.setState({tvshow: data});
			});
	}

	render() {
		return(
			<div className="container">

				<div className="panel panel-default">
					<div className="panel-heading">
						<h1 className="panel-title">{this.state.tvshow.name}</h1>
					</div>
					<div className="panel-body">
						<img src ={this.state.tvshow.poster_path}/>
						<h5>Number of Episodes: </h5>
						<p>{this.state.tvshow.num_episodes}</p>
						<h5>Number of Seasons: </h5>
						<p>{this.state.tvshow.num_seasons}</p>
						<h5>Overview: </h5>
						<p>{this.state.tvshow.overview}</p>
						<h5>Rating: </h5>
						<p>{this.state.tvshow.rating}</p>
					</div>
				</div>
			</div>

			);
	}
}
