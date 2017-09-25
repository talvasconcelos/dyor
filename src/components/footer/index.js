import { h, Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style'

export default class Footer extends Component {
	render() {
		return (
			<footer class={style.footer}>
				<div class={style.content}>
					<h5>Disclaimer</h5>
					<p><small>The Information on this website is provided for education and informational purposes only, without any express or implied warranty of any kind, including warranties of accuracy, completeness, or fitness for any particular purpose. The Information contained in or provided from or through this website is not intended to be and does not constitute financial advice, investment advice, trading advice or any other advice.</small></p>
					<hr/>
					<h5>Donations:</h5>
					<p>
						<span>BTC:&nbsp;</span>
						<small>1BvBMSEYstWetqTFn5Au4m4GFg7JaNVN2</small>
						<br/>
						<span>ETH:&nbsp;</span>
						<small>1BvBMSEYstWetqTFn5Au4m4GFg7JaNVN2</small>
					</p>
					<hr/>
				</div>
			</footer>
		)
	}
}
