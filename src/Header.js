import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Button, Container, Nav, MenuItem, NavDropdown } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

// The Header creates links that can be used to navigate
// between routes.
//Got the basic outline for the navbar from https://react-bootstrap.github.io/components.html#navigation
class Header extends React.Component {
    render(){
	return(
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">MARVELUS</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
		<Nav>
		<LinkContainer to="/about">
		<NavItem eventKey={1}>About</NavItem>
		</LinkContainer>
		<LinkContainer to="/characters">
		<NavItem eventKey={2}>Characters</NavItem>
		</LinkContainer>
		<LinkContainer to="/movies">
		<NavItem eventKey={3}>Movies</NavItem>
		</LinkContainer>
		<LinkContainer to="/tvshows">
		<NavItem eventKey={4}>TV Shows</NavItem>
		</LinkContainer>
		<LinkContainer to="/comicseries">
		<NavItem eventKey={5}>Comic Series</NavItem>
		</LinkContainer>
		<LinkContainer to="/actors">
		<NavItem eventKey={6}>Actors</NavItem>
		</LinkContainer>
		<LinkContainer to="/events">
		<NavItem eventKey={7}>Events</NavItem>
		</LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
	)
    }
}
const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top=true">
      <div className="container">
        <a className="navbar-brand" href="#">MarvelUs</a>
        {/*figure out this button stuff*/}
          
       
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
