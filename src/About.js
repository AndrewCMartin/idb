import React from 'react'
import {Row, Col} from 'react-bootstrap'
    
{/* Style for pictures so all consistent sizes */}
var imageStyles = {
    width: '450px',
    height: '350px'
}
var panelStyle={
    height: '175vh',
    width: '125vh',
    textAlign:'center',
    //backgroundColor: 'white',
    backgroundColor: 'black',
}
var containerStyle={
    marginTop: '10px',
    //color:'black',
    color:'white',

}
var container2Style={
    marginTop: '10px',
    //color:'black',
    color:'white',

}

var firstHeader={
    fontSize: '50px',
    textAlign: 'center',
    color: '#aa9898',
    textShadow: '2px 1px #8e0909',
}
var secondHeader={
    fontSize: '20px',
    textAlign: 'center',
    color: '#aa9898',
    weight: 'bold',
}

const About = () => (
    
    <div className="container" style={panelStyle}>
    <br/>
        <h1 style={firstHeader}><b>MARVELUS</b></h1>

        <div className="panel-body">

            {/* Description superheros, movies, tv shows, comics, creators, events */}
            <h2 style={secondHeader}>Marvelus is for users who want to browse
                superheros, movies, TV shows, comics, creators, events having to do with the Marvel Universe. </h2>

            {/* Group member descriptions with bios and personal statistics */}
            <h3 align="center" style={{color:'white'}}>Group Members</h3>

            <div className="container" style={containerStyle}>
                <div className="row">
                    <div className="col-sm-4">

                        <div className="panel-body"><img src="http://cs.utexas.edu/~andrewcm/me.jpg"
                                                         className="img-circle img-responsive img-center"
                                                         style={imageStyles} alt="Image"/></div>

                        <h4 align="center"><b>Andrew Martin</b></h4>

                        <li><b>Bio: </b> Andrew Martin is a third year Computer Science student, expecting to graduate
                            at the end of this year. I am also interested in music and linguistics, and I love to
                            travel.
                        </li>
                        <li><b>Responsibilities: </b>Database and back end</li>
                        <li><b>No. of Commits: </b>84</li>
                        <li><b>No. of Issues: </b>14</li>
                        <li><b>No. of Unit Tests: </b> 6</li>

                    </div>

                    <div className="col-sm-4">
                        <div className="panel-body"><img
                            src="https://d1b10bmlvqabco.cloudfront.net/attach/j65v8kewrx56xk/ijpb8t3798u7b/j7ppgtaf2ybt/cs373.jpeg?w=400&h=400"
                            className="img-circle img-responsive img-center" style={imageStyles} alt="Image"/></div>
                        <h4 align="center"><b> Bhavish Yalamanchi</b></h4>

                        <li><b>Bio: </b> I am a senior studying CS. I am currently exploring my options and figuring out
                            what I want to specialize in. I am currently interested in Data Science and am learning how
                            to use TensorFlow in my freetime. I also love making music and photography. Whether it be
                            photos, videos, or music, I think art is an important outlet that everyone should try.
                        </li>
                        <li><b>Responsibilities: </b>Front end</li>
                        <li><b>No. of Commits: </b>20</li>
                        <li><b>No. of Issues: </b> 8</li>
                        <li><b>No. of Issues: </b>11</li>
                        <li><b>No. of Unit Tests: </b> 6</li>

                    </div>

                    <div className="col-sm-4">
                        <div className="panel-body"><img
                            src="https://hannahanees.files.wordpress.com/2017/09/blog-headshot.jpg"
                            className="img-circle img-responsive img-center" styles="width:100%" alt="Image"/></div>
                        <h4 align="center"><b>Hannah Anees</b></h4>

                        <li><b>Bio: </b> Hannah Anees is in her third year of Computer Science at the University of
                            Texas and will be graduating in 2019 with a Bachelor’s of Science degree. She enjoys
                            conspiracy theories, urban myths and legends and anything else that might make the world
                            seem more interesting. She also is interested in music and TV Shows and only tolerates some
                            of the Marvel creations, most notably Spider-Man.
                        </li>
                        <li><b>Responsibilities: </b>Front end</li>
                        <li><b>No. of Commits: </b>68</li>
                        <li><b>No. of Issues: </b>11</li>
                        <li><b>No. of Unit Tests: </b>6</li>

                    </div>

                </div>
            </div>
            <br/>
            <hr></hr>
            <div className="container" style={container2Style}>
                <div className="row">
                    <div className="col-sm-4">

                        <div className="panel-body"><img
                            src="https://github.com/hsalgi100/hsalgi100.github.io/blob/master/profpic.jpg?raw=true"
                            className="img-circle img-responsive img-center" styles="width:100%" alt="Image"/></div>
                        <h4 align="center"><b>Helen Salgi</b></h4>

                        <li><b>Bio: </b>Sophomore majoring in Linguistics. Loves traveling and food and will be
                            graduating in May 2020.
                        </li>
                        <li><b>Observer</b></li>

                    </div>

                    <div className="col-sm-4">
                        <div className="panel-body"><img
                            src="https://sunainakrishnamoorthy.files.wordpress.com/2017/09/img_3508-e1504494704634.jpg?w=400&h=400"
                            className="img-circle img-responsive img-center"/></div>
                        <h4 align="center"><b>Sunaina Krishnamoorthy</b></h4>

                        <li><b>Bio: </b> Sunaina Krishnamoorthy is a junior majoring in Computer Science at the
                            University of Texas. She loves travel, photography and music. She will be graduating in May
                            of 2019 with a Bachelor's degree in Computer Science.
                        </li>
                        <li><b>Responsibilities: </b>Database and back end</li>
                        <li><b>No. of Commits: </b>27</li>
                        <li><b>No. of Issues: </b> 11</li>
                        <li><b>No. of Unit Tests: </b> 2</li>

                    </div>
                    <div className="col-sm-4">
                        <div className="panel-body"><img
                            src="https://tesiawusite.files.wordpress.com/2017/09/10989147_1088983151127213_5678027862076400869_n.jpg"
                            className="img-circle img-responsive img-center" styles="width:100%" alt="Image"/></div>
                        <h4 align="center"><b>Tesia Wu</b></h4>

                        <li><b>Bio: </b> Tesia Wu is a junior majoring in Computer Science at the University of Texas.
                            She is a huge fan of the Korean boy band BTS and loves music and movies, especially the
                            Marvel Cinematic Universe. She will be graduating in May of 2019 with a Bachelor's degree in
                            Computer Science.
                        </li>
                        <li><b>Responsibilities: </b>Front end</li>
                        <li><b>No. of Commits: </b>90</li>
                        <li><b>No. of Issues: </b> 11</li>
                        <li><b>No. of Unit Tests: </b>4</li>
                    </div>
                </div>
            </div>
            <br/>
            <hr/>
            {/* General group statistics */}
    <Row>
    <Col xs={4} md={4}>
            <h3 align="center" style={{color: 'white'}}><b>Statistics</b></h3>
            
            <li align="center" style={{color: 'white',fontSize:'17px'}}><b>Total No. of Commits: </b>338</li>
            <li align="center" style={{color: 'white',fontSize:'17px'}}><b>Total No. of Issues:</b>58</li>
            <li align="center" style={{color: 'white',fontSize:'17px'}}><b>Total No. of Unit Tests: </b>25</li>
            <li align="center" style={{fontSize:'17px', color: 'white'}}><a href="http://docs.andrewcmartin.apiary.io/#" style={{color: '#c12c2c'}}><b>Apiary API</b></a></li>
            <li align="center" style={{fontSize:'17px', color: 'white'}}><a href="https://github.com/AndrewCMartin/idb" style={{color: '#c12c2c'}}><b>GITHUB REPO</b></a></li>
            <li align="center" style={{fontSize:'17px', color: 'white'}}><a href="https://trello.com/b/qLTaMYvu/marvelus" style={{color: '#c12c2c'}}><b>TRELLO</b></a></li>
             
</Col>
<Col xs={4} md={4}>
            {/* Links to the required resources */}
            <h3 align="center" style={{color: 'white'}}><b>Data</b></h3>
            <li align="center" style={{color: 'white',fontSize:'17px'}}><a href="https://developer.marvel.com/docs" style={{color: '#c12c2c'}}><b>Marvel API</b></a>: We did not use any
                specific libraries to scrape the Marvel API, just the python requests module.
            </li>
            <li align="center" style={{color: 'white',fontSize:'17px'}}><a href="https://developers.themoviedb.org/3/" style={{color: '#c12c2c', fontSize:'17px'}}><b>The Movie Database</b></a>: We used the
                <a href="https://pypi.python.org/pypi/tmdbsimple" style={{color: '#c12c2c'}}> tmdbsimple</a> library to scrape data from the tmdb
                API
            </li>
</Col>
<Col xs={4} md={4}>
            <h3 align="center" style={{color: 'white'}}><b>Tools used</b></h3>
                <li align="center" style={{fontSize:'17px', color: 'white'}}><a  href="https://utexas.box.com/s/mtm6b1masafnlhjobbrifqgw1gehpp2f" style={{color: '#c12c2c'}}>Technical report</a></li>
            <li align="center" style={{fontSize:'17px', color: 'white'}}><a  href="https://utexas.box.com/s/8vxeogs7lsiceuwts8rgjz9vcfj8e034"style={{color: '#c12c2c'}}>UML Diagram</a></li>
    </Col>
    </Row>
        </div>
    </div>
)

export default About
