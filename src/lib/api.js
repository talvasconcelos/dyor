import axios from 'axios'

export const getAllPosts = () => {
  return axios
    .get('https://api.github.com/repos/talvasconcelos/dyor-posts/contents/')
    .then(response => response.data)
    .then(res => {
      res.pop()
      let out = res.map(post => {
        return {
          key: post.sha,
          date: post.name.slice(0, 10),
          slug: post.name.slice(11).replace(/\.([a-z]+)$/i, ''),
          name: post.name.slice(11).replace(/\.([a-z]+)$/i, '').replace(/\-/g, ' '),
          raw_url: post.download_url
        }
      })
      return out
    })
    .catch(err => console.error(err))
}

export const getPost = (postName) => {
  return axios
    .get(`https://raw.githubusercontent.com/talvasconcelos/dyor-posts/master/${postName}`)
    .then(response => response.data)
    .then(console.log)
}
