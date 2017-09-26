import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import memoize from 'fast-memoize'
import Markdown from '../../lib/markdown'
import moment from 'moment'
import yaml from 'yaml'
import style from './style'

// Find YAML FrontMatter preceeding a markdown document
const FRONT_MATTER_REG = /^\s*\-\-\-\n\s*([\s\S]*?)\s*\n\-\-\-\n/i

// Find a leading title in a markdown document
const TITLE_REG = /^\s*#\s+(.+)\n+/

const getContent = (path) => {
	return getPost(path).then(r => parseContent(r))
		//.then(r => console.log(r))
		//.then(r => new String(r))

}

const parseContent = (text) => {
  let [,frontMatter] = text.match(FRONT_MATTER_REG) || [],
  	meta = frontMatter && yaml.eval('---\n'+frontMatter.replace(/^/gm,'  ')+'\n') || {},
  	content = text.replace(FRONT_MATTER_REG, '')

  if (!meta.title) {
		let [,title] = content.match(TITLE_REG) || []
		if (title) {
			content = content.replace(TITLE_REG, '')
			meta.title = title
		}
	}
  return {
    content,
    meta
  }
}


export default class Post extends Component {

  state = {
    content: '',
    meta: ''
  }

  fetchContent = (post) => {
    return fetch(`https://raw.githubusercontent.com/talvasconcelos/dyor-posts/master/${post}.md`)
			.then(r => r.text())
			.then(r => parseContent(r))
			.then(r => this.setState(r))
	}

  componentWillReceiveProps(nextProps) {
    //console.log('will receive', nextProps)
    memoize(this.fetchContent(nextProps.post))
  }

	componentDidMount() {
		memoize(this.fetchContent(this.props.post))
	}

  render({...props}, {content, meta, ...state}) {
    return (
			<main class='container'>
				<div class={style.goBack}>
					<Link href={`/blog/`}><span>&#10092;</span>Back</Link>
					<Link href="#" style='float: right;'>Edit</Link>
					<hr/>
				</div>
				{content &&
					<div class='article'>
						<header>
							<h1>{meta.title}</h1>
							<div class={style.articleImg} style={`background-image: url(https://files.coinmarketcap.com/static/img/coins/128x128/${meta.marketcap_tag}.png)`} url></div>
						</header>
						<Markdown markdown={content} {...props} />
					</div>
				}
			</main>
			// <div class='container'>
			// 	<Link href={`/blog/`}>Back</Link>
			// 	{content &&
      //     <div>
			// 			<h2>{meta.title}</h2>
			// 			<hr/>
			// 			<Markdown class='article' markdown={content} {...props} />
      //     </div>
      //   }
			// </div>
    )
  }
}
