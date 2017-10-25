import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Button, Container, Carousel, Slide, CarouselItem } from 'react-bootstrap'

const Home = () => (

  
    <div>

{/* <link href="{{ url_for('static', filename='favicon.ico') }}" rel="icon" type="image/x-icon" /> */}


    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
            {/* <!-- Slide One - Set the background image for this slide in the line below --> */}
            <div className="item active"styles=" height: 65vh; min-height: 300px; background-color: black; background: no-repeat center center scroll;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;" >
                <img src="http://cdn2us.denofgeek.com/sites/denofgeekus/files/2017/06/spider-man_homecoming_reboot_box_office.jpg" alt="Homecoming" />
                <div className="carousel-caption">
                    <h3><Link to="google.com">Spider-Man: Homecoming</Link></h3>
                    <p></p>
                </div>
            </div>
            {/* Slide Two */}
            <div className="item"styles=" height: 65vh; min-height: 300px; background-color: black; background: no-repeat center center scroll;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;" >
                <img src="http://static.comicvine.com/uploads/original/9/99801/2244678-23308595.png" alt="The Avengers" />
                <div className="carousel-caption">
                    <h3><Link to="google.com">The Avengers</Link></h3>
                    <p></p>
                </div>
            </div>
            {/* Slide Three */}
            <div className="item"  styles=" height: 65vh; min-height: 300px; background-color: black; background: no-repeat center center scroll;-webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover;" >
                <img src="https://s3.amazonaws.com/libapps/accounts/36130/images/marvel.jpeg" alt="MARVEL Comics" />
                <div className="carousel-caption">
                    <h3><Link to="google.com">MARVEL Comics</Link></h3>
                    <p></p>
                </div>
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
        </a>
    </div>
    </div>
    // <section className="py-5">
    // <div className="container">
    //     <h1 align="center" style="font-size: 150px ; color: #C80815"><b>MarvelUs</b></h1>
    //     <p align="center" style="font-size: 40px"><b>Everything Marvel</b></p>
    // </div>
    // </section>
)

export default Home