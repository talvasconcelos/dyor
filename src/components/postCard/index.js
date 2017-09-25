import { h, Component } from 'preact'
import moment from 'moment'
import style from './style'

export const PostCard = ({children, ...props}) => {
	return (
		<article class={style.postcard}>
			<h2 class={style.title}>{props.title}</h2>
			<p>Posted: {moment(props.date).format('LL')}</p>
			{children}
		</article>
	)
}
