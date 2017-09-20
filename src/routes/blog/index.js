import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'
import { PostCard } from '../../components/postCard'


export default class Blog extends Component {
	constructor(props) {
    super(props);
    this.updateActive = this.updateActive.bind(this);
  }


	updateActive(url) {
		this.props.up({
			activePost: `https://raw.githubusercontent.com/talvasconcelos/dyor-posts/master/${url}.md`
		})
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data.activePost === '') {
			this.updateActive(nextProps.post)
		}
	}

	componentDidMount() {
		if(this.props.matches.post) {
			this.updateActive(this.props.post)
			//console.log(`https://raw.githubusercontent.com/talvasconcelos/dyor-posts/master/${this.props.post}.md`)
		}
	}

	render({...props}, {}) {
		return (
			<section class={style.blog}>
				{props.data.posts.map((post) =>
	        <PostCard key={post.id}
						title={post.slug.replace(/\-/g, ' ')}
						date={post.date}>
						<Link href={`/blog/${post.filename}`} onClick={() => this.updateActive(post.filename)}>More</Link>
					</PostCard>
					)}
				<pre>{JSON.stringify({props}, 0, ' ')}</pre>
			</section>
		)
	}
}
