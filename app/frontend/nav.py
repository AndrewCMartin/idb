from flask_nav import Nav
from flask_nav.elements import Navbar, View, Subgroup, Link, Text, Separator

# Store Flask-Nav instance

nav = Nav()


nav.register_element('top', Navbar('',
    View('Home', 'frontend.show', page='index.html'),
    View('About', 'frontend.show', page='about.html'),
    View('Characters', 'frontend.show', page='characters.html'),
    View('Movies', 'frontend.show', page='movies.html'),
    View('TV Shows', 'frontend.show', page='tvshows.html'),
    View('Comic Series', 'frontend.show', page='comicseries.html'),
    View('Actors', 'frontend.show', page='actors.html'),
    View('Events', 'frontend.show', page='events.html'),
    ))