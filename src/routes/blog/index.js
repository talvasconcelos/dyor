import { h, Component } from 'preact'
import { Link } from 'preact-router/match';
import memoize from 'fast-memoize'
import yaml from 'yaml'
import Markdown from '../../lib/markdown'
import style from './style'
import { getAllPosts, getPost } from '../../lib/api'
import { PostCard } from '../../components/postCard'

// Find YAML FrontMatter preceeding a markdown document
const FRONT_MATTER_REG = /^\s*\-\-\-\n\s*([\s\S]*?)\s*\n\-\-\-\n/i

// Find a leading title in a markdown document
const TITLE_REG = /^\s*#\s+(.+)\n+/


const getArticles = () => {
	return getAllPosts().then(r => {
		r.pop()
		return r
	})
}

const getContent = (path) => {
	return getPost(path)
		//.then(r => console.log(r))
		//.then(r => new String(r))
		//.then(r => parseContent(r))
}

const parseContent = (text) => {
  let [,frontMatter] = text.match(FRONT_MATTER_REG) || [],
  	meta = frontMatter && yaml.eval('---\n'+frontMatter.replace(/^/gm,'  ')+'\n') || {},
  	content = text.replace(FRONT_MATTER_REG, '');

  if (!meta.title) {
		let [,title] = content.match(TITLE_REG) || [];
		if (title) {
			content = content.replace(TITLE_REG, '');
			meta.title = title;
		}
	}
  return {
    content,
    meta
  }
}

export default class Blog extends Component {

	// state = {
	// 	links: [],
	// 	content: '',
	// 	meta: ''
	// }

	// handleClick(e) {
	// 	//console.log(e.target.value)
	// 	getContent(e.target.value)
	// 		.then(s => {
	// 			this.setState({content: s.content, meta: s.meta})
	// 		})
	// }

	componentDidMount() {
		console.log(this.props.data)
		memoize(getArticles()
			.then(s => {
				//this.setState({links: s})
				this.props.updater({
					links: s
				})
			}))
	}

	render({...props}, {}) {
		return (
			<section class={style.blog}>
				<h1>Blog</h1>
				{/* <pre>{JSON.stringify(props.data.links, 0, ' ')}</pre> */}
				{!props.data.links ?
					<h4>Loading...</h4> :
					<div>
						{props.data.links.map((post, i) =>
			        <PostCard key={post.i}
								title={post.name.slice(11).replace(/\.([a-z]+)$/i, '').replace(/\-/g, ' ')}
								handler={this.handleClick}
								date={post.name.slice(0, 10)}
								url={post.download_url}
								slug={post.name.slice(11).replace(/\.([a-z]+)$/i, '')}
								updater={props.setAppState}
							/>
			      )}
						<pre>{JSON.stringify(props.data, 0, ' ')}</pre>
					</div>
				}
			</section>
		)
	}
}
