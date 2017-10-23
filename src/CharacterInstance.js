import React from 'react'
import { Link } from 'react-router-dom'

var relevantMovies = [];
for(var i = 0; i < character.relevantMovies.length; i++) {
    relevantMovies.push(<li><Link to="{character.relevantMovies[i].getLink()}">character.relevantMovies[i].name</Link></li>);
}

var comicSeries = [];
for(var i = 0; i < character.comicSeries.length; i++) {
    comicSeries.push(<li><Link to="{character.comicSeries[i].getLink()}">character.comicSeries[i].name</Link></li>);
}

const CharacterInstance = () => (
<div class="container" style="margin: auto; margin-top:100px; width: 500px">
    <div class="panel panel-default" >
        <div class="panel-heading">
            <h1>{character.name}</h1>
        </div>
        <div class="panel-body">
            <img src="{movie.thumbnail}" class="img-responsive" style="width:100%" alt="Image" />
            <h3>Information</h3>
            <ul>
                <li><b>Name:</b> {character.name}</li>
                <li><b>Power:</b> {character.power}</li>
                <li><b>Origin:</b> {character.desc}</li>
                <li><b>Real Name:</b> {character.real_name}</li>
                <li>
                    <b>Relevant Movies/TV Shows:</b>
                    <ul> 
                        {relevantMovies}
                    </ul>
                </li>
                <li>
                    <b>Comic Series:</b>
                    <ul> 
                        {comicSeries}
                    </ul> 
                </li>
            </ul>
        </div>
    </div>
</div>
)

export default CharacterInstance