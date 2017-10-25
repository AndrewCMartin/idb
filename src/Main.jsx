import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Roster from './Roster'
import Schedule from './Schedule'
import Home from './Home'
import About from './About'
import Characters from './Characters'
import CharacterInstance from './CharacterInstance'
import Movies from './Movies'
import MovieInstance from './MovieInstance'
import TVShows from './TVShows'
import TVShowInstance from './TVShowInstance'
import ComicSeries from './ComicSeries'
import ComicSeriesInstance from './ComicSeriesInstance'
import Actors from './Actors'
import ActorInstance from './ActorInstance'
import Events from './Events'
import EventInstance from './EventInstance'

// const wrap = (name, component) => (
//   <App pageName={name}>{component}</App>
// );

const route = (path, name, component, id=false) => {
    const renderFN = ({match}) => {
        const props = id ? {id : match.params.id} : {};
        return wrap(name, React.createElement(component, props, null));
    };
    return (<Route exact path={path} render={renderFN} />);
};

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routed = () => (
  <Router>
      <Switch>
          <Route exact path='/' render={() => wrap('Home', <Home />)} />
          {route('/about', 'About', About)}
          {route('/characters', 'Characters', Characters)}
          {route('/characters/:id', 'Characters', CharacterInstance,true)}
          {route('/movies', 'Movies', Movies)}
          {route('/movies:id', 'Movies', MovieInstance, true)}
          {route('/tvshows', 'TVShows', TVShows)}
          {route('/tvshows:id', 'TVShows', TVShowInstance, true)}
          {route('/comicseries', 'ComicSeries',ComicSeries)}
          {route('/comicseries:id', 'ComicSeries', ComicSeriesInstance)}
          {route('/actors', 'Actors', Actors)}
          {route('/actors:id', 'Actors', ActorInstance, true)}
          {route('/events', 'Events', Events)}
          {route('/events:id', 'Events', EventInstance, true)}

      </Switch>
  </Router>
);

ReactDOM.render(
    (<Routed />),
    document.getElementById('react-root')
);