const API_URL = 'https://jsonplaceholder.typicode.com/posts'

async function sendRequest(url, options) {
  const response = await fetch(url, options)
  return await response.json()
}

function createRequestOptions(method, body) {
  return {
    method,
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    }
  }
}

async function fetchPosts() {
  return await sendRequest(API_URL)
}

async function createPost(post) {
  const options = createRequestOptions('POST', post)
  return await sendRequest(API_URL, options)
}

async function updatePost(postId,post) {
  const options = createRequestOptions('PUT', post)
  return await sendRequest(`${API_URL}/${postId}`, options)
}

async function deletePost(postId) {
  const options = createRequestOptions('DELETE')
  return await sendRequest(`${API_URL}/${postId}`, options)
}
export default {
  fetchPosts,
  createPost,
  updatePost,
  deletePost
}
