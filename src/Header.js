import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
	<style>
		.item {
			height: 65vh;
			min-height: 300px;
			background-color: black;
			background: no-repeat center center scroll;
			-webkit-background-size: cover;
			-moz-background-size: cover;
			-o-background-size: cover;
			background-size: cover;
		}
	</style>
      
	<header>

	<link href="{{ url_for('static', filename='favicon.ico') }}" rel="icon" type="image/x-icon" />
	<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
		<ol class="carousel-indicators">
			<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
			<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
			<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
		</ol>
		<div class="carousel-inner" role="listbox">
			<!-- Slide One - Set the background image for this slide in the line below -->
			<div class="item active" style="background-image: url('http://cdn2us.denofgeek.com/sites/denofgeekus/files/2017/06/spider-man_homecoming_reboot_box_office.jpg')">
				<div class="carousel-caption d-none d-md-block">
					<h3><a href="{{url_for('frontend.show', page='spidermanhomecoming.html')}}">Spider-Man: Homecoming</a></h3>
					<p></p>
				</div>
			</div>
			<!-- Slide Two - Set the background image for this slide in the line below -->
			<div class="item" style="background-image: url('http://static.comicvine.com/uploads/original/9/99801/2244678-23308595.png')">
				<div class="carousel-caption d-none d-md-block">
					<h3><a href="{{url_for('frontend.show', page='theavenger.html')}}">The Avengers</a></h3>
					<p></p>
				</div>
			</div>
			<!-- Slide Three - Set the background image for this slide in the line below -->
			<div class="item" style="background-image: url('https://s3.amazonaws.com/libapps/accounts/36130/images/marvel.jpeg')">
				<div class="carousel-caption d-none d-md-block">
					<h3><a href="{{url_for('frontend.show', page='comicseries.html')}}">MARVEL comics</a></h3>
					<p></p>
				</div>
			</div>
		</div>
		<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="sr-only">Previous</span>
		</a>
		<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="sr-only">Next</span>
		</a>
	</div>
	</header>
  <section class="py-5">
      <div class="container">
        <h1 align= center style="font-size: 150px ; color: #C80815"><b>MarvelUs</b></h1>
        <p align="center" style="font-size: 40px"><b>Everything Marvel</b></p>
      </div>
  </section>

		// <Link to='/'>Home</Link>

)

export default Header
