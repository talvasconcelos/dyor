import { h, Component } from 'preact'
import memoize from 'fast-memoize'

import { getPost } from '../../lib/api'

//const memoizedPost = memoize(getPost)

export default class Post extends Component {

  componentDidMount() {
    getPost('do-your-research.md')
  }

  render({...props}, {}) {
    return (
      <main>
        <h1>Single post</h1>
        <h2>{JSON.stringify({...props})}</h2>
        <p>{`${props.matches.post}.md`}</p>
      </main>
    )
  }
}
