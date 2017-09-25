import { h, Component } from 'preact'
import style from './style'

export default class Hero extends Component {
	render() {
		return (
			<section class={style.wrapper}>
				<div class={style.heroImg}></div>
				<div class={style.pitch}>
					<hgroup class='alignCenter'>
						<h1>DYOR</h1>
						<h2>
							<span>Do Your Own Research</span>
						</h2>
					</hgroup>
					<hr/>
					<p class='alignCenter'>Condensed, resumed, opinionated cryptocurrency&nbsp;research!</p>
				</div>
			</section>
		)
	}
}
