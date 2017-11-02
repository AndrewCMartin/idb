import React from 'react'
import {Button, Grid, Row} from 'react-bootstrap'

var axios = require('axios');

var imageStyles = {
    width: '400px',
    height: '450px'
}

function splitarray(input, spacing) {
    var output = [];

    for (var i = 0; i < input.length; i += spacing) {
        output[output.length] = input.slice(i, i + spacing);
    }

    return output;
}



class Movies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: []
        };
    }

    componentDidMount() {
        return axios.get('http://marvelus.me/api/movie?results_per_page=50').then(res => {
            const movies = res.data.objects.map(movie => movie)
            this.setState({movies});
        });
    }

    render() {
        return (

            <Grid>
                <Row>
                    <Button>Sort</Button>
                </Row>
                <Row>

                </Row>
                {/*{this.state.movies.map(movie =>*/}
                {/*<div className="col-sm-4">*/}
                {/*<div className="panel panel-info">*/}
                {/*<div className="panel-heading"><Link to={"/movie/" + movie.id}>{movie.title}</Link></div>*/}
                {/*<div className="panel-body"><img src={"http://image.tmdb.org/t/p/w500/" + movie.poster_path} className="img-responsive" style={imageStyles} alt="Image" /></div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*)}*/}
            </Grid>

        );
    }

}

export default Movies
