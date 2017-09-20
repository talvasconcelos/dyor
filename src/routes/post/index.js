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


export default class Post extends Component {

  state = {
    content: '',
    meta: ''
  }

  fetchContent = (url) => {
      return fetch(url)
  			.then(r => r.text())
  			.then(r => parseContent(r))
  			.then(r => this.setState(r))
	}

  componentDidMount() {
    console.log('did mount')
    this.fetchContent(this.props.active)
  }

  componentWillReceiveProps(nextProps) {
    console.log('will receive', nextProps)
    this.fetchContent(nextProps.active)
  }

  render({...props}, {content, meta, ...state}) {
    return (
			<div>
        <h1>margin</h1>
        <pre>{JSON.stringify({props}, 0, '  ')}</pre>
				{content &&
          <div>
            {/* <pre>{JSON.stringify({content}, 0, '  ')}</pre> */}
            <Markdown markdown={content} {...props} />
          </div>
        }
			</div>
    )
  }
}
