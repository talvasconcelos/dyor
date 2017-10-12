import { h, Component } from 'preact'
import { Router } from 'preact-router'
import memoize from 'fast-memoize'
import moment from 'moment'
import GAnalytics from 'ganalytics/dist/ganalytics.js'

import Nav from './nav'
import Home from '../routes/home'
import Footer from './footer'
import Profile from '../routes/profile'
import Blog from '../routes/blog'
import Post from '../routes/post'
import Social from './social'

const ga = new GAnalytics('UA-41200522-17')

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url
		this.props.setAppState({shareURL: encodeURIComponent(e.url)})
		ga.send('pageview')
	}

	fetchPosts = () => {
		return fetch(`//api.github.com/repos/talvasconcelos/dyor-posts/contents/posts`)
			.then(r => r.json())
			.then(r => {
				let out = r.map((post, i) => {
					return {
						id: post.sha,
						filename: post.name.replace(/\.([a-z]+)$/i, ''),
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
					<Blog path="/blog" data={props.appState} up={props.setAppState} />
					<Post path="/blog/:post" active={props.activePost} data={props.appState}/>
				</Router>
				<section class="container social">
					<h2>Share if like...</h2>
					<Social
						url={`https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fdyor.geekwear.eu${props.appState.shareURL}`}
						social_network='facebook'
					>
					</Social>
					<Social
						url={`https://twitter.com/intent/tweet/?text=DYOR%20-%20Cryptocurrency%20Research%20Blog&amp;url=http%3A%2F%2Fdyor.geekwear.eu${props.appState.shareURL}`}
						social_network='twitter'
					>
					</Social>
					<Social
						url={`https://reddit.com/submit/?url=http%3A%2F%2Fdyor.geekwear.eu${props.appState.shareURL}`}
						social_network='reddit'
					>
					</Social>
					<Social
						url={`https://telegram.me/share/url?text=DYOR%20-%20Cryptocurrency%20Research%20Blog&amp;url=http%3A%2F%2Fdyor.geekwear.eu${props.appState.shareURL}`}
						social_network='telegram'
					>
					</Social>
				</section>
				<Footer />
			</div>
		)
	}
}
