import { h, Component } from 'preact'
import style from './style'

export default class Feature extends Component {
	render() {
		return (
			<div class={style.feature}>
				<header>
					<img class={style.icon} src={this.props.icon} alt=""/>
					<h3>{this.props.title}</h3>
				</header>
				{this.props.children}
			</div>
		)
	}
}
