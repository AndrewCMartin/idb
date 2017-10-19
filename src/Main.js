import React from 'react'
import { Switch, Route } from 'react-router-dom'
/*import Home from './Home'
import Roster from './Roster'
import Schedule from './Schedule'*/
import Header from './Header'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Header}/>
{/*      <Route path='/about' component={About}/>
      <Route path='/characters' component={Characters}/>
      <Route path='/movies' component={Movies}/>
      <Route path='/tvshows' component={TVShows}/>
      <Route path='/comicseries' component={ComicSeries}/>
      <Route path='/actors' component={Actors}/>
      <Route path='/events' component={Events}/>*/}
    </Switch>
  </main>
)

export default Main
