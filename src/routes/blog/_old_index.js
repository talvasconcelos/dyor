import { h, Component } from 'preact';
import memoize from 'fast-memoize';
import style from './style';

import { getAllPosts, getPost } from '../../lib/api';

import { Blogroll } from '../../components/blog';
import PostSingle from '../../components/postSingle';

const URL_REPO = 'https://api.github.com/repos/talvasconcelos/dyor-posts/contents/'

// Extract date from post
const DATE_REG = /\d{4}([.\-/ ])\d{2}\1\d{2}/;

// Find YAML FrontMatter preceeding a markdown document
const FRONT_MATTER_REG = /^\s*\-\-\-\n\s*([\s\S]*?)\s*\n\-\-\-\n/i;

// Find a leading title in a markdown document
const TITLE_REG = /^\s*#\s+(.+)\n+/;

const memoizeProd = process.env.NODE_ENV === 'production' ? memoize : f=>f

const memoizedPosts = memoizeProd(getAllPosts)

// const getAllPaths = memoizeProd(getAllPosts)
// 	.then(res => {
//
// 	})

const getContent = (path) => {
  //let path = `${URL}/${filename}`
  return getPost(path).then(r => parseContent(r))
}

const parseContent = (text) => {
  let [,frontMatter] = text.match(FRONT_MATTER_REG) || [];
  let meta = frontMatter && yaml.eval('---\n'+frontMatter.replace(/^/gm,'  ')+'\n') || {};
  let content = text.replace(FRONT_MATTER_REG, '');

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
	state = {
		posts: []
	}

	getArticle(e) {
		e.map(el => {
			if(el.slug === this.props.matches.post)
				return el.raw_url
		})
		.then(res => getPost(res))
		.then(r => {
			this.setState(r)
		})
	}

	componentDidMount() {
		memoizedPosts().then(posts => {
			this.setState({posts})
		})

		if(this.props.matches.post)
			this.state.post.map(cur => {
				if(cur.slug === this.props.matches.post)
					return cur.raw_url
			}).then(r => console.log(r))
			//this.getArticle()
	}

	render({...props}, { posts, ...state }) {
		return (
			<main class={style.blog}>
				{props.matches.post ?
					<PostSingle {...props} content={this.state.content} />
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
