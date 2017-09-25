from flask_nav import Nav
from flask_nav.elements import Navbar, View, Subgroup, Link, Text, Separator

# Store Flask-Nav instance

nav = Nav()


nav.register_element('top', Navbar('',
    View('Home', 'frontend.show', page='index.html'),
    View('About', 'frontend.show', page='about.html'),
    View('Superheroes', 'frontend.show', page='superheros.html'),
    View('Movies', 'frontend.show', page='movies.html'),
    View('TV Shows', 'frontend.show', page='tvshows.html'),
    View('Comics', 'frontend.show', page='comics.html'),
    View('Creators', 'frontend.show', page='creators.html'),
    View('Events', 'frontend.show', page='events.html'),
    ))