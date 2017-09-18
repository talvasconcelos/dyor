import { h, Component } from 'preact'
import memoize from 'fast-memoize'

import { getPost } from '../../lib/api'

const URI = `https://raw.githubusercontent.com/talvasconcelos/dyor-posts/master/`

//const memoizedPost = memoize(getPost)

export default class Post extends Component {

  componentDidMount() {
    //let path = `URI${rr}`
    getPost(this.props.url)
    //console.log(this.props.url)
  }

  render({...props}, {...state}) {
    return (
      <main>
        <h1>Single post</h1>
        <pre>{JSON.stringify({...props}, 0, ' ')}</pre>
        <p></p>
      </main>
    )
  }
}
