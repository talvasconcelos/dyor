import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'

export default class Footer extends Component {
	render() {
		return (
			<footer class={style.footer}>
				<div>
					<h5>Donations:</h5>
					<p>
						<span>BTC:&nbsp;</span>
						<small>1BvBMSEYstWetqTFn5Au4m4GFg7JaNVN2</small>
					</p>
					<p>
						<span>ETH:&nbsp;</span>
						<small>1BvBMSEYstWetqTFn5Au4m4GFg7JaNVN2</small>
					</p>
				</div>
				<hr/>
			</footer>
		)
	}
}
