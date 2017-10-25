import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const About = () => (
<div className="panel panel-default" >
        <h1 align="center" styles= "font-size: 45px"><b>Marvelus - Canvas Group 15</b></h1>

        <div className="panel-body">
            {/* <!-- Description superheros, movies, tv shows, comics, creators, events--> */}
            <p align="center" styles="font-size: 25px ; color: darkgray">Marvelus is for users who want to browse superheros, movies, TV shows, comics, creators, events having to do with the Marvel Universe. </p>

            <h3 align="center" styles="color:black">Group Members</h3>

            <div className="container" styles="margin-top:100px;">
              <div className="row">
                <div className="col-sm-4">
                  <div className="panel panel-info">
                    <div className="panel-heading"> Andrew Martin</div>
                    <div className="panel-body"><img src="{{url_for('static', filename='andrew.jpg')}}" className="img-responsive" styles="width:100%" alt="Image" /></div>
                    <div className="panel-footer">
                        Andrew Martin

                        <li><b>Bio: </b> Andrew Martin is a third year Computer Science student, expecting to graduate at the end of this year. I am also interested in music and linguistics, and I love to travel.  </li>
                        <li><b>Responsibilities: </b> <a href="{{url_for('frontend.show', page='tvshows.html')}}">TV Shows</a></li>
                        <li><b>No. of Commits: 31</b> </li>
                        <li><b>No. of Issues: </b> 6</li>
                        <li><b>No. of Unit Tests: </b> 0</li>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="panel panel-danger">
                    <div className="panel-heading">Bhavish Yalamanchi</div>
                    <div className="panel-body"><img src="https://d1b10bmlvqabco.cloudfront.net/attach/j65v8kewrx56xk/ijpb8t3798u7b/j7ppgtaf2ybt/cs373.jpeg" className="img-responsive" styles="width:100%" alt="Image" /></div>
                    <div className="panel-footer">
                        Bhavish Yalamanchi

                        <li><b>Bio: </b> I am a senior studying CS. I am currently exploring my options and figuring out what I want to specialize in. I am currently interested in Data Science and am learning how to use TensorFlow in my freetime. I also love making music and photography. Whether it be photos, videos, or music, I think art is an important outlet that everyone should try.</li>
                        <li><b>Responsibilities: </b><a href="{{url_for('frontend.show', page='events.html')}}">Events</a></li>
                        <li><b>No. of Commits: 8</b> </li>
                        <li><b>No. of Issues: </b> 4</li>
                        <li><b>No. of Commits: </b> 4</li>
                        <li><b>No. of Issues: </b> </li>
                        <li><b>No. of Unit Tests: </b> 0</li>
                      </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="panel panel-success">
                    <div className="panel-heading">Hannah Anees</div>
                    <div className="panel-body"><img src="https://hannahanees.files.wordpress.com/2017/09/blog-headshot.jpg" className="img-responsive" styles="width:100%" alt="Image" /></div>
                    <div className="panel-footer">
                        Hannah Anees

                        <li><b>Bio: </b> Hannah Anees is in her third year of Computer Science at the University of Texas and will be graduating in 2019 with a Bachelor’s of Science degree. She enjoys conspiracy theories, urban myths and legends and anything else that might make the world seem more interesting. She also is interested in music and TV Shows and only tolerates some of the Marvel creations, most notably Spider-Man.</li>
                        <li><b>Responsibilities: </b><a href="{{url_for('frontend.show', page='actors.html')}}">Actors</a></li>
                        <li><b>No. of Commits: 21</b> </li>
                        <li><b>No. of Issues: </b> 4</li>
                        <li><b>No. of Unit Tests: </b> 0</li>
                      </div>
                  </div>
                </div>
              </div>
            </div><br />
            <div className="container" styles="margin-top:100px;">
              <div className="row">
                <div className="col-sm-4">
                  <div className="panel panel-info">
                    <div className="panel-heading"> Helen Salgi</div>
                    <div className="panel-body"><img src="https://github.com/hsalgi100/hsalgi100.github.io/blob/master/profpic.jpg?raw=true" className="img-responsive" styles="width:100%" alt="Image" /></div>
                    <div className="panel-footer">
                        Helen Salgi

                        <li><b>Bio: </b>Sophomore majoring in Linguistics. Loves traveling and food and will be graduating in May 2020.</li>
                        <li><b>Observer</b></li>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="panel panel-danger">
                    <div className="panel-heading">Sunaina Krishnamoorthy</div>
                    <div className="panel-body"><img src="/static/sunaina.jpg" /></div>
                    <div className="panel-footer">
                        Sunaina Krishnamoorthy

                        <li><b>Bio: </b> Sunaina Krishnamoorthy is a junior majoring in Computer Science at the University of Texas. She loves travel, photography and music. She will be graduating in May of 2019 with a Bachelor's degree in Computer Science.</li>
                        <li><b>Responsibilities: </b>Movies</li>
                        <li><b>No. of Commits: 13</b> </li>
                        <li><b>No. of Issues: </b> 4</li>
                        <li><b>No. of Unit Tests: </b> 0</li>
                      </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="panel panel-success">
                    <div className="panel-heading">Tesia Wu</div>
                    <div className="panel-body"><img src="https://tesiawusite.files.wordpress.com/2017/09/10989147_1088983151127213_5678027862076400869_n.jpg" className="img-responsive" styles="width:100%" alt="Image" /></div>
                    <div className="panel-footer">
                        Tesia Wu

                        <li><b>Bio: </b> Tesia Wu is a junior majoring in Computer Science at the University of Texas. She is a huge fan of the Korean boy band BTS and loves music and movies, especially the Marvel Cinematic Universe. She will be graduating in May of 2019 with a Bachelor's degree in Computer Science.</li>
                        <li><b>Responsibilities: </b>Characters and Comics</li>
                        <li><b>No. of Commits: 24</b> </li>
                        <li><b>No. of Issues: </b> 4</li>
                        <li><b>No. of Unit Tests: </b> 0</li>
                      </div>
                  </div>
                </div>
              </div>
            </div><br />

            <h3 align="center" styles="font-size: 30px"><b>Statistics</b></h3>
            <ul>
                <li align="center" styles= "color: gray"><b>Total No. of Commits: </b> </li>
                <li align="center" styles= "color: gray"><b>Total No. of Issues: </b> </li>
                <li align="center" styles= "color: gray"><b>Total No. of Unit Tests: </b> 0</li>
                <li align="center" styles= "color: gray"><b>Apiary API</b> </li>
                <li align="center" styles= "color: gray"><b>GITHUB REPO</b> </li>
                <li align="center" styles= "color: gray"><b>TRELLO</b> </li>
            </ul>
            <h3 align="center"><b>Data</b></h3>
                {/* <!-- <li align="center" styles= "color: gray"><b>Data Sources: </b> --> */}

                        <li align="center">https://developer.marvel.com/docs</li>
                        <li align="center">https://comicvine.gamespot.com/api/documentation</li>
                        <li align="center">The Movie Database</li>

            <h3 align="center"><b>Tools used</b></h3>

            <a align="center" href="https://utexas.box.com/s/zimf1bvhu2r2dhw598shugcm4b7jr2do">Technical report</a>
        </div>
    </div>


)

export default About