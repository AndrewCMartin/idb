import React from 'react'
import { Link } from 'react-router-dom'
import { axios } from 'axios'

function getMovies(){
  return axios.get('http://marvelus.me/api/movie?q=%7B%7D');
}


var movies = getMovies();
movies.then(function(data) {

});

var moviesInGrid = [];

for (var i = 0; i < movies.objects.length; i++) {
    moviesInGrid.push(
        <div class="col-sm-4">
            <div class="panel panel-info">
                <div class="panel-heading"><Link to="{movies[i].getLink()}">{movies.objects[i].getName()}</Link></div>
                <div class="panel-body"><img src="{movies.objects[i].getImageLink()}" class="img-responsive" style="width:100%" alt="Image" /></div>
                <div class="panel-footer">{movies.objects[i].getName()}</div>
            </div>
        </div>
    );
}

const Movies = () => (
  <div class="container" style="margin-top:100px;">
    <div class="row">
      {charsInGrid}    
    </div>
  </div>
  <br />
)

export default Movies