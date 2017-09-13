import { h, Component } from 'preact';
import memoize from 'fast-memoize';
import style from './style';

import { getAllPosts, getPost } from '../../lib/api';

import { Blogroll } from '../../components/blog';
import { PostSingle } from '../../components/postSingle';

const URL = 'https://api.github.com/repos/talvasconcelos/dyor-posts/contents/'

// Extract date from post
const DATE_REG = /\d{4}([.\-/ ])\d{2}\1\d{2}/;

// Find YAML FrontMatter preceeding a markdown document
const FRONT_MATTER_REG = /^\s*\-\-\-\n\s*([\s\S]*?)\s*\n\-\-\-\n/i;

// Find a leading title in a markdown document
const TITLE_REG = /^\s*#\s+(.+)\n+/;

const memoizedPosts = memoize(getAllPosts)

export default class Blog extends Component {
	state = {
		posts: [],
		content: []
	}

	getPostURI() {
		this.state.posts.filter(post => {
			post.slug === props.matches.post
		})
	}

	componentDidMount() {
		memoizedPosts().then(posts => {
			this.setState({posts})
		})
	}

	render({...props}, { posts, ...state }) {
		return (
			<main class={style.blog}>
				{props.matches.post ?
					<PostSingle {...props} url={this.getPostURI()} />
					:
					<Blogroll posts={posts} />
				}
			</main>
		);
	}
}
/* <pre>{JSON.stringify(props.matches)}</pre> */

/*<h1>blog</h1>
{posts.map(post =>
<PostCard key={post.key} title={post.name} link={`/blog/${post.slug}`} date={post.date} />
)}*/



//{props.matches.post && <Blogroll posts={posts} />}
//<pre>{JSON.stringify(props.matches.post)}</pre>
//{props.posts.map(post => {
//  <PostCard key={post.key} title={post.name} link={`/blog/${post.slug}`} date={post.date} />
//})}
