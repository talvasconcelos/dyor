import { h, Component } from 'preact'
import memoize from 'fast-memoize'
import Markdown from '../../lib/markdown'

import { getPost } from '../../lib/api'

const URI = `https://raw.githubusercontent.com/talvasconcelos/dyor-posts/master/`

//const memoizedPost = memoize(getPost)



export default class Post extends Component {

  state = {
    md: ''
  }

  componentDidMount() {
    let links = this.props.data.links
    let link = links.map(post => {
      if (post.name.slice(11).replace(/\.([a-z]+)$/i, '') === this.props.post)
        return post.download_url
    })
    getPost(link[0]).then(r => {
      this.setState({md: r})
    })
  }

  render({...props}, {...state}) {
    return (
      <main>
        <h1>Single post</h1>
        {state.md && <Markdown markdown={state.md} {...props} />}
        <pre>{JSON.stringify({...state}, 0, ' ')}</pre>
        <p></p>
      </main>
    )
  }
}
