import { h, Component } from 'preact';
import style from './style';

export default class Feature extends Component {
	render() {
		return (
      <div>
        <h2>{this.props.title}</h2>
        {this.props.children}
      </div>
		);
	}
}
