// import { API_URL } from '@/lib/constants'

// const defaults = {
//   headers: {
//     common: {},
//   },
// }

// async function request(method, path, body = null, config = {}) {
//   const url = `${API_URL}${path}`
//   const headers = {
//     ...defaults.headers.common,
//     ...(config.headers || {}),
//   }

//   const requestOptions = {
//     method,
//     headers,
//     ...config,
//   }

//   if (body !== null && !(body instanceof FormData)) {
//     requestOptions.headers = {
//       'Content-Type': 'application/json',
//       ...requestOptions.headers,
//     }
//     requestOptions.body = JSON.stringify(body)
//   } else if (body instanceof FormData) {
//     requestOptions.body = body
//   }

//   const response = await fetch(url, requestOptions)
//   const text = await response.text()
//   const data = text ? JSON.parse(text) : null

//   if (!response.ok) {
//     const error = new Error(data?.error || data?.message || 'API request failed')
//     error.response = { data, status: response.status }
//     throw error
//   }

//   return { data, status: response.status }
// }

// const api = {
//   defaults,
//   get: (path, config) => request('GET', path, null, config),
//   post: (path, body, config) => request('POST', path, body, config),
//   put: (path, body, config) => request('PUT', path, body, config),
//   patch: (path, body, config) => request('PATCH', path, body, config),
//   delete: (path, body, config) => request('DELETE', path, body, config),
// }

// export default api



// import { API_URL } from '@/lib/constants'

// const defaults = {
//   headers: {
//     common: {},
//   },
// }

// async function request(method, path, body = null, config = {}) {
//   const url = `${API_URL}${path}`
  
//   // 1. Dynamic Authorization Token Recovery Hook
//   let token = null
//   if (typeof window !== 'undefined') {
//     // Looks for local storage variables matching your AuthContext engine
//     token = localStorage.getItem('token') || localStorage.getItem('mb_token')
//   }

//   const headers = {
//     ...defaults.headers.common,
//     ...(token ? { 'Authorization': `Bearer ${token}` } : {}), // Injects JWT token conditionally
//     ...(config.headers || {}),
//   }

//   const requestOptions = {
//     method,
//     headers,
//     ...config,
//   }

//   if (body !== null && !(body instanceof FormData)) {
//     requestOptions.headers = {
//       'Content-Type': 'application/json',
//       ...requestOptions.headers,
//     }
//     requestOptions.body = JSON.stringify(body)
//   } else if (body instanceof FormData) {
//     requestOptions.body = body
//   }

//   try {
//     // 2. Core Fetch Engine executed inside a protected transaction layer
//     const response = await fetch(url, requestOptions)
//     const text = await response.text()
//     const data = text ? JSON.parse(text) : null

//     if (!response.ok) {
//       const error = new Error(data?.error || data?.message || 'API request failed')
//       error.response = { data, status: response.status }
//       throw error
//     }

//     return { data, status: response.status, error: false }

//   } catch (error) {
//     // 3. Catch Network-Level Dropped Packets Safely ('Failed to Fetch')
//     console.error(`🚨 API Network Error [${method} ${path}]:`, error.message)
    
//     // Check if it's a standard HTTP status error thrown by the section above
//     if (error.response) {
//       throw error
//     }

//     // Fabricate a safe fallback context payload so components like ActiveTeamRooms don't hard crash
//     return { 
//       data: null, 
//       status: 503, 
//       error: true, 
//       message: 'Network connection refused. Please check if your backend API server is running.' 
//     }
//   }
// }

// const api = {
//   defaults,
//   get: (path, config) => request('GET', path, null, config),
//   post: (path, body, config) => request('POST', path, body, config),
//   put: (path, body, config) => request('PUT', path, body, config),
//   patch: (path, body, config) => request('PATCH', path, body, config),
//   delete: (path, body, config) => request('DELETE', path, body, config),
// }

// export default api




// import { API_URL } from '@/lib/constants'

// const defaults = {
//   headers: {
//     common: {},
//   },
// }

// async function request(method, path, body = null, config = {}) {
//   const url = `${API_URL}${path}`
  
//   // 1. Dynamic Authorization Token Recovery Hook
//   let token = null
//   if (typeof window !== 'undefined') {
//     // Looks for local storage variables matching your AuthContext engine
//     token = localStorage.getItem('token') || localStorage.getItem('mb_token')
//   }

//   const headers = {
//     ...defaults.headers.common,
//     ...(token ? { 'Authorization': `Bearer ${token}` } : {}), // Injects JWT token conditionally
//     ...(config.headers || {}),
//   }

//   const requestOptions = {
//     method,
//     headers,
//     ...config,
//   }

//   if (body !== null && !(body instanceof FormData)) {
//     requestOptions.headers = {
//       'Content-Type': 'application/json',
//       ...requestOptions.headers,
//     }
//     requestOptions.body = JSON.stringify(body)
//   } else if (body instanceof FormData) {
//     requestOptions.body = body
//   }

//   try {
//     // 2. Core Fetch Engine executed inside a protected transaction layer
//     const response = await fetch(url, requestOptions)
//     const text = await response.text()
//     const data = text ? JSON.parse(text) : null

//     if (!response.ok) {
//       const error = new Error(data?.error || data?.message || 'API request failed')
//       error.response = { data, status: response.status }
//       throw error
//     }

//     return { data, status: response.status, error: false }

//   } catch (error) {
//     // 3. Check if it's a standard HTTP status error thrown by the section above
//     if (error.response) {
//       throw error
//     }

//     // Fabricate a safe fallback context payload so components like ActiveTeamRooms don't hard crash
//     return { 
//       data: null, 
//       status: 503, 
//       error: true, 
//       message: 'Network connection refused. Please check if your backend API server is running.' 
//     }
//   }
// }

// const api = {
//   defaults,
//   get: (path, config) => request('GET', path, null, config),
//   post: (path, body, config) => request('POST', path, body, config),
//   put: (path, body, config) => request('PUT', path, body, config),
//   patch: (path, body, config) => request('PATCH', path, body, config),
//   delete: (path, body, config) => request('DELETE', path, body, config),
// }

// export default api










//ISISHI

import { API_URL } from '@/lib/constants'

const defaults = {
  headers: {
    common: {},
  },
}

async function request(method, path, body = null, config = {}) {
  const url = `${API_URL}${path}`
  
  let token = null
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || localStorage.getItem('mb_token')
  }

  const headers = {
    ...defaults.headers.common,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(config.headers || {}),
  }

  const requestOptions = {
    method,
    headers,
    ...config,
  }

  if (body !== null && !(body instanceof FormData)) {
    requestOptions.headers = {
      'Content-Type': 'application/json',
      ...requestOptions.headers,
    }
    requestOptions.body = JSON.stringify(body)
  } else if (body instanceof FormData) {
    requestOptions.body = body
  }

  try {
    const response = await fetch(url, requestOptions)
    const text = await response.text()
    const data = text ? JSON.parse(text) : null

    // MODIFIED: We no longer throw immediately on 400/404/500
    // Instead, we return an object with an 'error' flag so the UI can handle it gracefully.
    if (!response.ok) {
      return {
        data: data,
        status: response.status,
        error: true,
        message: data?.error || data?.message || 'API request failed'
      }
    }

    return { data, status: response.status, error: false }

  } catch (error) {
    console.error("API Request Exception:", error)
    return { 
      data: null, 
      status: 503, 
      error: true, 
      message: 'Network unreachable. Please ensure the backend is active.' 
    }
  }
}

const api = {
  defaults,
  get: (path, config) => request('GET', path, null, config),
  post: (path, body, config) => request('POST', path, body, config),
  put: (path, body, config) => request('PUT', path, body, config),
  patch: (path, body, config) => request('PATCH', path, body, config),
  delete: (path, body, config) => request('DELETE', path, body, config),
}

export default api









// import { API_URL } from '@/lib/constants'

// const defaults = {
//   headers: {
//     common: {},
//   },
// }

// async function request(method, path, body = null, config = {}) {
//   const url = `${API_URL}${path}`

//   let token = null

//   if (typeof window !== 'undefined') {
//     token =
//       localStorage.getItem('token') ||
//       localStorage.getItem('mb_token')
//   }

//   const headers = {
//     ...defaults.headers.common,
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...(config.headers || {}),
//   }

//   const requestOptions = {
//     method,
//     headers,
//     ...config,
//   }

//   if (body !== null && !(body instanceof FormData)) {
//     requestOptions.headers = {
//       'Content-Type': 'application/json',
//       ...requestOptions.headers,
//     }

//     requestOptions.body = JSON.stringify(body)
//   } else if (body instanceof FormData) {
//     requestOptions.body = body
//   }

//   try {
//     console.log('==========================')
//     console.log('API Request')
//     console.log('Method:', method)
//     console.log('URL:', url)
//     console.log('Headers:', requestOptions.headers)
//     console.log('==========================')

//     const response = await fetch(url, requestOptions)

//     const text = await response.text()

//     let data = null

//     try {
//       data = text ? JSON.parse(text) : null
//     } catch {
//       data = text
//     }

//     if (!response.ok) {
//       console.error('API Error Response:', {
//         status: response.status,
//         data,
//       })

//       return {
//         data,
//         status: response.status,
//         error: true,
//         message:
//           data?.error ||
//           data?.message ||
//           `Request failed with status ${response.status}`,
//       }
//     }

//     return {
//       data,
//       status: response.status,
//       error: false,
//     }
//   } catch (error) {
//     console.error('================================')
//     console.error('NETWORK ERROR')
//     console.error('URL:', url)
//     console.error('Method:', method)
//     console.error('Error:', error)
//     console.error('================================')

//     return {
//       data: null,
//       status: 503,
//       error: true,
//       message:
//         error?.message ||
//         'Network unreachable. Please ensure the backend is running.',
//     }
//   }
// }

// const api = {
//   defaults,

//   get(path, config) {
//     return request('GET', path, null, config)
//   },

//   post(path, body, config) {
//     return request('POST', path, body, config)
//   },

//   put(path, body, config) {
//     return request('PUT', path, body, config)
//   },

//   patch(path, body, config) {
//     return request('PATCH', path, body, config)
//   },

//   delete(path, body, config) {
//     return request('DELETE', path, body, config)
//   },
// }

// export default api