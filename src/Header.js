import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">MarvelUs</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              	<Link to='/'>Home</Link>
            </li>
            <li class="nav-item">
				<Link to='/about'>About</Link>
            </li>
            <li class="nav-item">
				<Link to='/characters'>Characters</Link>
            </li>
            <li class="nav-item">
				<Link to='/movies'>Movies</Link>
            </li>
            <li class="nav-item">
				<Link to='/tvshows'>TV Shows</Link>
            </li>
            <li class="nav-item">
				<Link to='/comicseries'>Comic Series</Link>
            </li>
            <li class="nav-item">
				<Link to='/actors'>Actors</Link>
            </li>
            <li class="nav-item">
				<Link to='/events'>Events</Link>
            </li>
          </ul>
        </div>
      </div>
</nav>
		// <Link to='/'>Home</Link>

)

export default Header
