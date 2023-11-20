const API_URL = 'https://jsonplaceholder.typicode.com/todos'

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

async function fetchTodos() {
  return await sendRequest(API_URL)
}

async function createTodo(todo) {
  const options = createRequestOptions('POST', todo)
  return await sendRequest(API_URL, options)
}

async function updateTodo(todoId,todo) {
  const options = createRequestOptions('PUT', todo)
  return await sendRequest(`${API_URL}/${todoId}`, options)
}

async function deleteTodo(todoId) {
  const options = createRequestOptions('DELETE')
  return await sendRequest(`${API_URL}/${todoId}`, options)
}
export default {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo
}
