import React from 'react'
import { Link } from 'react-router-dom'

var movieChars = [];
for(var i = 0; i < movie.characters.length; i++) {
    movieChars.push(<li><Link to="{movie.characters[i].getLink()}">movie.characters[i].name</Link></li>);
}

var movieCast = [];
for(var i = 0; i < movie.cast.length; i++) {
    movieCast.push(<li><Link to="{movie.cast[i].getLink()}">movie.cast[i].name</Link></li>);
}

const MovieInstance = () => (
<div class="container" style="margin: auto; margin-top:100px; width: 500px">
    <div class="panel panel-default" >
        <div class="panel-heading">
            <h1>{movie.title}</h1>
        </div>
        <div class="panel-body">
            <img src="{movie.poster_path}" class="img-responsive" style="width:100%" alt="Image" />
            <h3>Information</h3>
            <ul>
                <li><b>Year:</b> {movie.release_date}</li>
                <li><b>Director:</b> {movie.director}</li>
                <li><b>Writer:</b> {movie.writers}</li>
                <li>
                    <b>Main Characters:</b>
                    <ul>
                        {movieChars}
                    </ul>
                </li>
                <li>
                    <b>Cast:</b> 
                    <ul>
                        {movieCast}
                    </ul>
                </li>
                <li><b>Runtime:</b> {movie.runtime}</li>
                <li><b>Rating:</b> {movie.rating}</li>
            </ul>
        </div>
    </div>
</div>
)

export default MovieInstance