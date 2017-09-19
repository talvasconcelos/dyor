import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import moment from 'moment';
import style from './style';

export const PostCard = ({...props}) => {
	return (
		<article>
			<img src="" alt=""/>
			<h2>{props.title}</h2>
			<p>{moment(props.date).format('LL')}</p>
			<p class='attention-grabber'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus corporis eaque inventore culpa ipsa consequatur, accusamus atque molestias cumque aut.</p>
			<Link href={`/blog/${props.slug}`}>More</Link>
		</article>
	);
}
