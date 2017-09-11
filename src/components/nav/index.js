import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Nav extends Component {

	render() {
		return (
			<header class={style.header}>
        <nav  class={style.navBar}>
          <input type="checkbox" id='menu-toggle' class={style.menuToggle}/>
          <label for="menu-toggle" class={style.labelToggle}></label>
          <ul>
            <li>
              <Link activeClassName={style.active} href="/">Home</Link>
            </li>
            <li>
              <Link activeClassName={style.active} href="/blog">Blog</Link>
            </li>
            <li>
              <Link activeClassName={style.active} href="/profile">Me</Link>
            </li>
            <li>
              <Link activeClassName={style.active} href="/profile/john">John</Link>
            </li>
          </ul>
        </nav>
			</header>
		);
	}
}
