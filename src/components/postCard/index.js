import { h, Component } from 'preact'
import moment from 'moment'
import style from './style'

export const PostCard = ({children, ...props}) => {
	return (
		<article>
			<img src="" alt=""/>
			<h2>{props.title}</h2>
			<p>{moment(props.date).format('LL')}</p>
			{children}
		</article>
	)
}
