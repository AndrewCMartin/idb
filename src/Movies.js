import React from 'react'
import { Link } from 'react-router-dom'

var moviesInGrid = [];
for (var i = 0; i < numChars; i++) {
    moviesInGrid.push(
        <div class="col-sm-4">
            <div class="panel panel-info">
                <div class="panel-heading"><Link to="{movies[i].getLink()}">{movies[i].getName()}</Link></div>
                <div class="panel-body"><img src="{movies[i].getImageLink()}" class="img-responsive" style="width:100%" alt="Image" /></div>
                <div class="panel-footer">{movies[i].getName()}</div>
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