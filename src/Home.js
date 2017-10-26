import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Button, Container, Carousel, Slide, CarouselItem, PageHeader } from 'react-bootstrap'

var imageStyles = {
    height:"700px",
}



class Home extends React.Component{
    render(){
	return(
		<div>
		{/*	<PageHeader className="text-center text-danger"><strong>MARVELUS</strong></PageHeader>*/}
		<Carousel controls={false}>
		<Carousel.Item>
		<img className="center-block" alt="900x500" src="http://cdn2us.denofgeek.com/sites/denofgeekus/files/2017/06/spider-man_homecoming_reboot_box_office.jpg" style={imageStyles}/>
		</Carousel.Item>
		<Carousel.Item animateIn>
		<img className="center-block" alt="900x500" src="http://static.comicvine.com/uploads/original/9/99801/2244678-23308595.png" style={imageStyles}/>
		</Carousel.Item>
		<Carousel.Item>
		<img className="center-block"  alt="900x500" src="https://s3.amazonaws.com/libapps/accounts/36130/images/marvel.jpeg" style={imageStyles}/>
		</Carousel.Item>
		</Carousel>

		<div>
		<h1 className="text-center text-danger"><b>MARVELUS</b></h1>
		</div>
		</div>
	)
    }
}
export default Home
