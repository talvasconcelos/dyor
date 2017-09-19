import { h, Component } from 'preact'
import { Router } from 'preact-router'
import memoize from 'fast-memoize'
import moment from 'moment'

import { getAllPosts } from '../lib/api'

//import AppState from '../AppState'

//import Header from './header';
import Nav from './nav'
import Home from '../routes/home'
import Footer from './footer'
import Profile from '../routes/profile'
import Blog from '../routes/blog'
import Post from '../routes/post'
// import Home from 'async!./home';
// import Profile from 'async!./profile';

const getArticles = () => {
	return getAllPosts().then(r => {
		r.pop()
		let out = r.map((post, i) => {
			return {
				id: post.sha,
				filename: post.path,
				slug: post.name.slice(11).replace(/\.([a-z]+)$/i, ''),
				date: post.name.slice(0, 10),
				raw_url: post.download_url
			}
		})
		return out
	})
}

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url
	}


	componentDidMount() {
		memoize(getArticles()
			.then(s => {
				//this.setState({links: s})
				this.props.setAppState({
					posts: s
				})
			}))
	}


	render({...props}, {}) {
		return (

				<div id="app">
					<Nav />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Blog path="/blog/:post?" data={props.appState} updater={props.setAppState}/>
						{/* <Blog path="/blog/:post" data={props.appState} /> */}
						<Profile path="/profile/" user="me" />
						<Profile path="/profile/:user" />
					</Router>
					<Footer />
				</div>

		)
	}
}
