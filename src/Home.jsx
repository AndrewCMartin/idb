import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
      <div id='myCarousel' className= 'carousal slide' data-ride='carousel'>
           <div className="carousel-caption">
        <h1>MarvelUs</h1>
       </div>
       <ol className='carousel-indicators'>
           <li data-target='#myCarousel' data-slide-to='0' className=''></li>
           <li data-target='#myCarousel' data-slide-to='1' className=''></li>
           <li data-target='#myCarousel' data-slide-to='2' className='active'></li>
       </ol>
       <div className='carousel-inner' role='listbox'>
        <div className='item'>
             <img className='first-slide'
                  src={'http://cdn2us.denofgeek.com/sites/denofgeekus/files/2017/06/spider-man_homecoming_reboot_box_office.jpg'}
              alt='First slide'/>
        </div>
        <div className='item'>
             <img className='first-slide'
                  src={'http://static.comicvine.com/uploads/original/9/99801/2244678-23308595.png'}
              alt='Second slide'/>
        </div>
        <div className='item'>
             <img className='first-slide'
                  src={'https://s3.amazonaws.com/libapps/accounts/36130/images/marvel.jpeg'}
              alt='Third slide'/>
        </div>
    </div>
    </div>

);


export default Home