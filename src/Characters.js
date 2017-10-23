import React from 'react'
import { Link } from 'react-router-dom'

var charsInGrid = [];
for (var i = 0; i < numChars; i++) {
    charsInGrid.push(
        <div class="col-sm-4">
            <div class="panel panel-info">
                <div class="panel-heading"><Link to="{characters[i].getLink()}">{characters[i].getName()}</Link></div>
                <div class="panel-body"><img src="{characters[i].getImageLink()}" class="img-responsive" style="width:100%" alt="Image" /></div>
                <div class="panel-footer">{characters[i].getName()}</div>
            </div>
        </div>
    );
}


const Characters = () => (
    <div class="container" style="margin-top:100px;">
        <div class="row">
            {charsInGrid}    
        </div>
    </div>
    <br />
)

export default Characters