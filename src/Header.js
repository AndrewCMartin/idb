import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Button, Container, Nav, MenuItem, NavDropdown } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import body from './Header.css'

// The Header creates links that can be used to navigate
// between routes.
//Got the basic outline for the navbar from https://react-bootstrap.github.io/components.html#navigation
        
const navbar = {backgroundColor: 'red !important'};

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
		<Nav style={navbar}>
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
export default Header
