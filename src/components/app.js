import { h, Component } from 'preact'
import { Router } from 'preact-router'
import memoize from 'fast-memoize'
import moment from 'moment'

import Nav from './nav'
import Home from '../routes/home'
import Footer from './footer'
import Profile from '../routes/profile'
import Blog from '../routes/blog'
import Post from '../routes/post'

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url
	}

	fetchPosts = () => {
		return fetch(`//api.github.com/repos/talvasconcelos/dyor-posts/contents/`)
			.then(r => r.json())
			.then(r => {
				let out = r.map((post, i) => {
					return {
						id: post.sha,
						filename: post.path.replace(/\.([a-z]+)$/i, ''),
						slug: post.name.slice(11).replace(/\.([a-z]+)$/i, ''),
						date: post.name.slice(0, 10),
						raw_url: post.download_url
					}
				})
				return out.reverse()
			})
			.then(r => this.props.setAppState({posts: r}))
	}


	componentDidMount() {
		// this.fetchPosts()
		memoize(this.fetchPosts())
	}


	render({...props}, {}) {
		return (
			<div id="app">
				<Nav />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Blog path="/blog/:post?" data={props.appState} up={props.setAppState} />
					<Post path="/blog/:post" active={props.activePost} data={props.appState}/>
				</Router>
				<Footer />
			</div>
		)
	}
}
