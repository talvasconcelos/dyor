import { h, Component } from 'preact'
import { Link } from 'preact-router/match';
//import memoize from 'fast-memoize'
import yaml from 'yaml'
import Markdown from '../../lib/markdown'
import style from './style'
import { getPost } from '../../lib/api'
import { PostCard } from '../../components/postCard'
import PostSingle from '../../components/postSingle'

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
	return getPost(path).then(r => parseContent(r))
		//.then(r => console.log(r))
		//.then(r => new String(r))

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

const findPost = (a, b) => a === b

export default class Blog extends Component {


	render({data, matches, ...props}, {}) {
		return (
			<section class={style.blog}>
				{matches.post &&
					<PostSingle url={data.posts.filter(post => post.slug === matches.post)}/>
				}
				{!matches.post &&
					data.posts.map((post) =>
		        <PostCard key={post.id}
							title={post.slug.replace(/\-/g, ' ')}
							date={post.date}
							slug={post.slug}
						/>
		      )
				}
				{/* <pre>{JSON.stringify({data}, 0, ' ')}</pre> */}
			</section>
		)
	}

	// render({data}, {}) {
	// 	return (
	// 		<section class={style.blog}>
	// 			<h1>Blog</h1>
	// 			<div>
	// 				{data.posts.map((post) =>
	// 	        <PostCard key={post.id}
	// 						title={post.slug.replace(/\-/g, ' ')}
	// 						date={post.date}
	// 						slug={post.slug}
	// 					/>
	// 	      )}
	// 				<pre>{JSON.stringify({...this.props.data}, 0, ' ')}</pre>
	// 			</div>
	// 		</section>
	// 	)
	// }
}
