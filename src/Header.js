import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Button, Container } from 'react-bootstrap'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">MarvelUs</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item active">
              	<Link to='/'>Home</Link>
            </li>
            <li className="nav-item">
				<Link to='/about'>About</Link>
            </li>
            <li className="nav-item">
				<Link to='/characters'>Characters</Link>
            </li>
            <li className="nav-item">
				<Link to='/movies'>Movies</Link>
            </li>
            <li className="nav-item">
				<Link to='/tvshows'>TV Shows</Link>
            </li>
            <li className="nav-item">
				<Link to='/comicseries'>Comic Series</Link>
            </li>
            <li className="nav-item">
				<Link to='/actors'>Actors</Link>
            </li>
            <li className="nav-item">
				<Link to='/events'>Events</Link>
            </li>
          </ul>
        </div>
      </div>
</nav>

)

export default Header
