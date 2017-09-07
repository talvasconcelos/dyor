import { h, Component } from 'preact';
import cx from 'classnames';
import style from './style';

import Hero from '../../components/hero'
import Feature from '../../components/feature'

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<Hero />
				<section class={style.full}>
					<Feature title='Feat#1'>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident debitis itaque maiores atque, qui explicabo quisquam expedita cupiditate voluptatibus accusantium.</p>
					</Feature>
					<Feature title='Feat#2'>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident debitis itaque maiores atque, qui explicabo quisquam expedita cupiditate voluptatibus accusantium.</p>
					</Feature>
					<Feature title='Feat#3'>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident debitis itaque maiores atque, qui explicabo quisquam expedita cupiditate voluptatibus accusantium.</p>
					</Feature>
				</section>
			</div>
		);
	}
}
