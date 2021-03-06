import Axios from 'axios'
import { api } from '../settings'

/* selectors */
export const getAll = ({ posts }) => posts.data

export const getCurrentPost = ({ posts }) => posts.currentPost
export const getPostById = ({ posts, users }, postId) => {
  const post = posts.data.find((innerPost) => innerPost._id === postId)
  if (post) {
    post.author = users.find((user) => user._id === post.author._id)
  }
  return post
}
export const getShouldFilter = ({ posts }) => posts.filter
export const getLoadingState = ({ posts }) => posts.loading

/* action name creator */
const reducerName = 'posts'
const createActionName = (name) => `app/${reducerName}/${name}`

/* action types */
const FETCH_START = createActionName('FETCH_START')
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS')
const FETCH_ERROR = createActionName('FETCH_ERROR')
const FETCH_POSTS = createActionName('FETCH_POSTS')
const FETCH_CURRENT_POST = createActionName('FETCH_CURRENT_POST')
const CHANGE_STATUS = createActionName('CHANGE_STATUS')
const ADD_POST = createActionName('ADD_POST')
const UPDATE_POST = createActionName('UPDATE_POST')
const REMOVE_POST = createActionName('REMOVE_POST')
const FILTER_POSTS = createActionName('FILTER_POSTS')

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START })
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS })
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR })
const fetchPosts = (payload) => ({ payload, type: FETCH_POSTS })
const fetchCurrentPost = (payload) => ({ payload, type: FETCH_CURRENT_POST })
const changeStatus = (payload) => ({ payload, type: CHANGE_STATUS })
export const addPost = (payload) => ({ payload, type: ADD_POST })
export const updatePost = (payload) => ({ payload, type: UPDATE_POST })
export const removePost = (payload) => ({ payload, type: REMOVE_POST })
export const filterPostsByAuthor = (payload) => ({
  payload,
  type: FILTER_POSTS,
})

/* thunk creators */
export const requestChangeStatus = (payload) => async (dispatch) => {
  await Axios.put(`${api.url}/${api.endpoints.posts}/${payload.id}`, payload)
    .then((res) => {
      dispatch(changeStatus(res.data))
    })
    .catch((err) => {
      dispatch(fetchError(err.message || true))
    })
}

export const fetchAllPosts = () => async (dispatch, getState) => {
  const { posts } = getState()

  if (!posts.data.length) {
    dispatch(fetchStarted())
    await Axios.get(`${api.url}/${api.endpoints.posts}`)
      .then((res) => {
        dispatch(fetchPosts(res.data))
        dispatch(fetchSuccess(res.data))
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true))
      })
  }
}

export const fetchPostById = (postId) => (dispatch, getState) => {
  const { posts } = getState()

  if (!posts.currentPost || posts.currentPost._id !== postId) {
    dispatch(fetchStarted())
    Axios.get(`${api.url}/${api.endpoints.posts}/${postId}`)
      .then((res) => {
        dispatch(fetchCurrentPost(res.data))
        dispatch(fetchSuccess(res.data))
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true))
      })
  }
}

export const requestAddPost = (payload) => async (dispatch) => {
  dispatch(fetchStarted())
  await Axios.post(`${api.url}/${api.endpoints.addPost}`, payload)
    .then((res) => {
      dispatch(addPost(res.data))
      dispatch(fetchSuccess(res.data))
    })
    .catch((err) => {
      dispatch(fetchError(err.message || true))
    })
}

export const requestUpdatePost = (payload) => async (dispatch) => {
  dispatch(fetchStarted())
  const { formData, postId } = payload
  await Axios.put(`${api.url}/${api.endpoints.editPost}/${postId}`, formData)
    .then((res) => {
      dispatch(updatePost(res.data))
      dispatch(fetchSuccess(res.data))
    })
    .catch((err) => {
      dispatch(fetchError(err.message || true))
    })
}

export const requestRemovePost = (postId) => async (dispatch) => {
  dispatch(fetchStarted())
  await Axios.delete(`${api.url}/${api.endpoints.posts}/${postId}`)
    .then((res) => {
      dispatch(removePost(postId))
      dispatch(fetchSuccess(res.data))
    })
    .catch((err) => {
      dispatch(fetchError(err.message || true))
    })
}

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      }
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
      }
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      }
    }
    case CHANGE_STATUS: {
      return {
        ...statePart,
        data: statePart.data.map((table) => {
          if (table.id !== action.payload.id) {
            return table
          }
          return action.payload
        }),
      }
    }
    case FETCH_POSTS: {
      return { ...statePart, data: action.payload }
    }
    case FETCH_CURRENT_POST: {
      return { ...statePart, currentPost: action.payload }
    }
    case ADD_POST: {
      return { ...statePart, data: [...statePart.data, action.payload] }
    }
    case UPDATE_POST: {
      const index = statePart.data.findIndex(
        (item) => item._id === action.payload._id
      )
      const newData = [...statePart.data]
      newData[index] = action.payload

      return { ...statePart, data: newData }
    }
    case REMOVE_POST: {
      return {
        ...statePart,
        data: [...statePart.data.filter((post) => post._id !== action.payload)],
      }
    }
    case FILTER_POSTS: {
      return {
        ...statePart,
        filter: action.payload,
      }
    }
    default:
      return statePart
  }
}
