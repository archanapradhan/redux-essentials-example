//An example on custom fetch wrapper to replace axios

const { eachQuarterOfInterval } = require('date-fns/esm')

function client(endpoint, customConfig) {
  const config = {
    method: 'GET',
    ...customConfig,
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then((response) => response.json())
}

client(`books?query=${encodeURIComponent(query)}`).then(
  (data) => {
    console.log('books', data.books)
  },
  (error) => {
    console.log('error happened', error)
  }
)
//=====================================================
function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

client(`books?query=${encodeURIComponent(query)}`).then(
  (data) => {
    console.log('books', data.books)
  },
  (error) => {
    console.log('error happened', error)
  }
)

//=======================================================
//send data to the backend

function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

client('login', { body: { username, password } }).then(
  (data) => {
    console.log('here the logged in user data', data)
  },
  (error) => {
    console.log('oh no, login failed', error)
  }
)

//make authenticated requests
const localStorageKey = '__bookshelf_token'

function client(endpoint, { body, ...customConfig } = {}) {
  const token = window.localStorage.getItem(localStorageKey)
  const headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config = {
    method: body ? 'POST' : 'GET',
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }
  if (body) {
    config.body = JSON.stringyfy(body)
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        logout()
        window.location.assign(window.location)
        return
      }
      const data = await response.json
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

function logout() {
  window.localStorage.removeItem(localStorageKey)
}
