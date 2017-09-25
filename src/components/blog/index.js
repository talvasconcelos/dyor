import { h } from 'preact'

import PostCard from '../../components/postCard'

export const Blogroll = ({posts}) => {
	return (
		<div>
			<h1>Blog</h1>
			{posts.map((post, i) =>
				<PostCard key={post.i} title={post.name} link={`/blog/${post.slug}`} date={post.date} />
			)}
		</div>
	)
}
