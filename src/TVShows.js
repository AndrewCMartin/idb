import React from 'react'
import { Link } from 'react-router-dom'

const TVShows = () => (
    <div class="container" style="margin-top:100px;">
          <div class="row">
            <div class="col-sm-4">
              <div class="panel panel-info">
                <div class="panel-heading"><a href="{{url_for('frontend.show', page='agentsofshield.html')}}">Agents of S.H.I.E.L.D.</a></div>
                <div class="panel-body"><img src="https://image.tmdb.org/t/p/w500/3CFeptFvp0CE6H665Fpzq8JHxWX.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
                <div class="panel-footer">
                  Agents of S.H.I.E.L.D.
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="panel panel-success">
                <div class="panel-heading"><a href="{{url_for('frontend.show', page='agentcarter.html')}}">Agent Carter</a></div>
                <div class="panel-body"><img src="https://image.tmdb.org/t/p/w500/mQWBExOnHrGVsjkpWczJjo6bhZy.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
                <div class="panel-footer">
                    Agent Carter
                  </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="panel panel-danger">
                <div class="panel-heading"><a href="{{url_for('frontend.show', page='defenders.html')}}">Defenders</a></div>
                <div class="panel-body"><img src="https://image.tmdb.org/t/p/w500/49XzINhH4LFsgz7cx6TOPcHUJUL.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
                <div class="panel-footer">
                    Defenders
                  </div>
              </div>
            </div>
          </div>
        </div><br>
)

export default TVShows