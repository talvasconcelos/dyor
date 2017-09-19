import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import Markdown from '../../lib/markdown';
import moment from 'moment';
import yaml from 'yaml'

import { getPost } from '../../lib/api';

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


export default class PostSingle extends Component {

  state = {
    content: '',
    meta: ''
  }

  content() {
    //alert(this.props.url[0])
    //getContent(this.props.url.raw_url).then(r => this.setState(r))
  }

  componentDidMount() {
    //this.content()
    // getPost(this.props.data.raw_url)
    //   .then(r => parseContent(r))
    //   .then(r => this.setState(r))
  }

  render({url, ...props}, {content, meta}) {
    return (
      <pre>{JSON.stringify({url.raw_url, content}, 0, '  ')}</pre>
    )
  }
}

// export default ({ ...props }) => {
//   return (
//     <div>
//       <Link href='/blog'>Back</Link>
//       <pre>{JSON.stringify({props.data}, 0, '  ')}</pre>
//     </div>
// 	);
// }

/*
const URL = `https://rawgit.com/talvasconcelos/dyor-posts/master`

// Find YAML FrontMatter preceeding a markdown document
const FRONT_MATTER_REG = /^\s*\-\-\-\n\s*([\s\S]*?)\s*\n\-\-\-\n/i;

// Find a leading title in a markdown document
const TITLE_REG = /^\s*#\s+(.+)\n+/;

const getContent = (filename) => {
  let path = `${URL}/${filename}`
  return getPost(path).then(r => parseContent(r))
}

const parseContent = (text) => {
  let [,frontMatter] = text.match(FRONT_MATTER_REG) || []
  let meta = frontMatter && yaml.eval('---\n'+frontMatter.replace(/^/gm,'  ')+'\n') || {}
  let content = text.replace(FRONT_MATTER_REG, '')

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
    content: ''
  }

  content() {
    let file = this.props.posts.map(post => {
      if (post.slug === this.props.matches.post)
        return post.fileName
    })

    getContent(file).then(s => {
      this.setState(s)
    })

  }

  componentDidMount() {
    this.content()
  }

  render({file, ...props}, {state}) {
    return (
      <pre>{JSON.stringify(file, 0, ' ')}</pre>
    )
  }
}

/*
export default ({ ...props }) => {

	let file = props.posts.map(post => {
    if (post.slug === props.matches.post)
      return post.fileName
  })

  let content

  getPost(`${URL}/${file[0]}`)
    .then(r => content = r)

  // let content = () => {
  //   getPost(`${URL}/${file[0]}`).then(r => console.log(r))
  // }

	return (
    <div>
      <pre>{JSON.stringify({...props}, 0, '  ')}</pre>
      {content && <div>{content}</div>}
      {content && <Markdown markdown={content} {...props} />}
    </div>
	);
};
*/
