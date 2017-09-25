import { h, Component } from 'preact'
import cx from 'classnames'
import style from './style'

import Hero from '../../components/hero'
import Feature from '../../components/feature'

export default class Home extends Component {
	render() {
		return (
			<main>
				<Hero />
				<section class={style.full}>
					<div class='container'>
						<Feature title='Feat#1'>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident debitis itaque maiores atque, qui explicabo quisquam expedita cupiditate voluptatibus accusantium.</p>
						</Feature>
						<Feature title='Feat#2'>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident debitis itaque maiores atque, qui explicabo quisquam expedita cupiditate voluptatibus accusantium.</p>
						</Feature>
						<Feature title='Feat#3'>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident debitis itaque maiores atque, qui explicabo quisquam expedita cupiditate voluptatibus accusantium.</p>
						</Feature>
					</div>
				</section>
			</main>
		)
	}
}
