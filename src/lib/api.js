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
          fileName: post.name,
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

export const getPost = (x) => {
  return axios
    .get(x)
    .then(response => response.data)
}
