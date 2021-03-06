import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Button, Container, Nav, MenuItem, NavDropdown, FormGroup, FormControl } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import './Header.css'
    
import SearchBar from "./SearchBar.js"

// The Header creates links that can be used to navigate
// between routes.
//Got the basic outline for the navbar from https://react-bootstrap.github.io/components.html#navigation
    

class Header extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleSearchPage = this.handleSearchPage.bind(this);
    }
    
    handleSearchPage() {
      return (  
        <Link to="/about">
        </Link>
      );
    }
    
    render(){
        return(
          <Navbar className="navbar-default" inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">MARVELUS</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Nav pullRight>
                <SearchBar />
            </Nav>

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
export default Header
