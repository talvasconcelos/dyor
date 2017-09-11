import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class PostCard extends Component {
	render({title, link}, {}) {
		return (
			<article>
				<img src="" alt=""/>
				<h2>{title}</h2>
				<p class='attention-grabber'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus corporis eaque inventore culpa ipsa consequatur, accusamus atque molestias cumque aut.</p>
				<Link href={link}>more</Link>
			</article>
		);
	}
}
