const API_URL = 'https://jsonplaceholder.typicode.com/albums'

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

async function fetchAlbums() {
  return await sendRequest(API_URL)
}

async function createAlbum(album) {
  const options = createRequestOptions('POST', album)
  return await sendRequest(API_URL, options)
}

async function updateAlbum(albumId,album) {
  const options = createRequestOptions('PUT', album)
  return await sendRequest(`${API_URL}/${albumId}`, options)
}

async function deleteAlbum(albumId) {
  const options = createRequestOptions('DELETE')
  return await sendRequest(`${API_URL}/${albumId}`, options)
}
export default {
  fetchAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum
}
