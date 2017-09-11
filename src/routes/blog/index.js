import { h, Component } from 'preact';
import style from './style';

import PostCard from '../../components/postCard';

const URL = 'https://api.github.com/repos/talvasconcelos/dyor-posts/contents/'

const DATE_REG = /\d{4}([.\-/ ])\d{2}\1\d{2}/

// Find YAML FrontMatter preceeding a markdown document
const FRONT_MATTER_REG = /^\s*\-\-\-\n\s*([\s\S]*?)\s*\n\-\-\-\n/i;

// Find a leading title in a markdown document
const TITLE_REG = /^\s*#\s+(.+)\n+/;

export default class Blog extends Component {
	state = {
		posts: [
						// {
						// 	"name": "2017-09-01-do-your-research.md",
						// 	"path": "2017-09-01-do-your-research.md",
						// 	"sha": "e82ca6f61da492a56d65846e8ea62278ff03d60f",
						// 	"size": 1976,
						// 	"url": "https://api.github.com/repos/talvasconcelos/dyor-posts/contents/2017-09-01-do-your-research.md?ref=master",
						// 	"html_url": "https://github.com/talvasconcelos/dyor-posts/blob/master/2017-09-01-do-your-research.md",
						// 	"git_url": "https://api.github.com/repos/talvasconcelos/dyor-posts/git/blobs/e82ca6f61da492a56d65846e8ea62278ff03d60f",
						// 	"download_url": "https://raw.githubusercontent.com/talvasconcelos/dyor-posts/master/2017-09-01-do-your-research.md",
						// 	"type": "file",
						// 	"_links": {
						// 		"self": "https://api.github.com/repos/talvasconcelos/dyor-posts/contents/2017-09-01-do-your-research.md?ref=master",
						// 		"git": "https://api.github.com/repos/talvasconcelos/dyor-posts/git/blobs/e82ca6f61da492a56d65846e8ea62278ff03d60f",
						// 		"html": "https://github.com/talvasconcelos/dyor-posts/blob/master/2017-09-01-do-your-research.md"
						// 	}
						// },
						// {
						// 	"name": "2017-09-03-hello-world.md",
						// 	"path": "2017-09-03-hello-world.md",
						// 	"sha": "2f421622904cad45f369960e944b82de2e34e515",
						// 	"size": 2721,
						// 	"url": "https://api.github.com/repos/talvasconcelos/dyor-posts/contents/2017-09-03-hello-world.md?ref=master",
						// 	"html_url": "https://github.com/talvasconcelos/dyor-posts/blob/master/2017-09-03-hello-world.md",
						// 	"git_url": "https://api.github.com/repos/talvasconcelos/dyor-posts/git/blobs/2f421622904cad45f369960e944b82de2e34e515",
						// 	"download_url": "https://raw.githubusercontent.com/talvasconcelos/dyor-posts/master/2017-09-03-hello-world.md",
						// 	"type": "file",
						// 	"_links": {
						// 		"self": "https://api.github.com/repos/talvasconcelos/dyor-posts/contents/2017-09-03-hello-world.md?ref=master",
						// 		"git": "https://api.github.com/repos/talvasconcelos/dyor-posts/git/blobs/2f421622904cad45f369960e944b82de2e34e515",
						// 		"html": "https://github.com/talvasconcelos/dyor-posts/blob/master/2017-09-03-hello-world.md"
						// 	}
						// },
						// {
						// 	"name": "README.md",
						// 	"path": "README.md",
						// 	"sha": "a9619df3f23566fef7339b97696ad97d57f71cdc",
						// 	"size": 12,
						// 	"url": "https://api.github.com/repos/talvasconcelos/dyor-posts/contents/README.md?ref=master",
						// 	"html_url": "https://github.com/talvasconcelos/dyor-posts/blob/master/README.md",
						// 	"git_url": "https://api.github.com/repos/talvasconcelos/dyor-posts/git/blobs/a9619df3f23566fef7339b97696ad97d57f71cdc",
						// 	"download_url": "https://raw.githubusercontent.com/talvasconcelos/dyor-posts/master/README.md",
						// 	"type": "file",
						// 	"_links": {
						// 		"self": "https://api.github.com/repos/talvasconcelos/dyor-posts/contents/README.md?ref=master",
						// 		"git": "https://api.github.com/repos/talvasconcelos/dyor-posts/git/blobs/a9619df3f23566fef7339b97696ad97d57f71cdc",
						// 		"html": "https://github.com/talvasconcelos/dyor-posts/blob/master/README.md"
						// 	}
						// }
					]
	}

	getLinks() {
		fetch(URL)
		 .then(response => response.json())
		 .then(res => {
			 res.pop()
			 let out = res.map(post => {
				 return {
					 key: post.sha,
					 date: post.name.slice(0, 10),
					 name: post.name.slice(11).replace(/\.([a-z]+)$/i, '').replace(/\-/g, ' '),
					 raw_url: post.download_url
				 }
			 })
			 return out
			 //this.setState({posts: res})
		 })
		 .then(res => this.setState({posts: res}))
	}

	componentDidMount() {
		this.getLinks()
	}

	render({}, { posts }) {
		return (
			<main class={style.blog}>
				<h1>blog</h1>
				{posts.map(post => <PostCard key={post.key} title={post.name} link={post.name} date={post.date} />)}
			</main>
		);
	}
}
