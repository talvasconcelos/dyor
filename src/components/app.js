import { h, Component } from 'preact';
import { Router } from 'preact-router';

//import AppState from '../AppState'

//import Header from './header';
import Nav from './nav';
import Home from '../routes/home';
import Footer from './footer';
import Profile from '../routes/profile';
import Blog from '../routes/blog';
import Post from '../routes/post';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render({...props}, {}) {
		return (

				<div id="app">
					<Nav />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Blog path="/blog/" data={props.appState} updater={props.setAppState}/>
						<Post path="/blog/post/:post" />
						<Profile path="/profile/" user="me" />
						<Profile path="/profile/:user" />
					</Router>
					<Footer />
				</div>

		);
	}
}
