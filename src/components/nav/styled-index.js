import styled from 'styled-components'
import { Link } from 'preact-router/match'

const Navbar = styled.div`
	position: relative;
  height: 4rem;
  width: 100%;
  background: pink;
  box-shadow: 0px 0px 32px rgba(0,0,0,0.15);
`

const Navul = styled.ul`
	position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  margin-left: -100%;
  width: 320px;
  max-width: 66%;
  background: cyan;
`

const Hambgr = styled.label`
  position: absolute;
  right: 0;
  display: block;
  margin: 1em;
  background: linear-gradient(to bottom, var(--primary-color) 0%, var(--primary-color) 20%, transparent 20%, transparent 40%, var(--primary-color) 40%, var(--primary-color) 60%, transparent 60%, transparent 80%, var(--primary-color) 80%, var(--primary-color) 100%);
  height: 2rem;
  width: 2rem;
  cursor: pointer;
`

const Nav = (props) => {
  return (
    <Navbar>
      <nav>
        <input type="checkbox" id='menu-toggle' style='display: none;'/>
        <Hambgr for="menu-toggle" />
        <Navul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/profile">Me</Link>
          </li>
          <li>
            <Link href="/profile/john">John</Link>
          </li>
        </Navul>
      </nav>
    </Navbar>
  )
}

export default Nav
