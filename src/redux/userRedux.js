import Axios from 'axios'
import { api } from '../settings'

/* selectors */
export const getUserId = ({ user, users }) =>
  user.logged && users.length
    ? users.find((item) => item._id === user._id)._id
    : ''

export const getUserRole = ({ user, users }) =>
  user.logged && users.length
    ? users.find((item) => item._id === user._id).role
    : 'anonymous'

export const getIsAdmin = ({ user, users }) =>
  !!(getUserRole({ user, users }) === 'admin')

/* action name creator */
const reducerName = 'user'
const createActionName = (name) => `app/${reducerName}/${name}`

/* action types */
const CHANGE = createActionName('CHANGE')

/* action creators */
export const changeUser = (payload) => ({ payload, type: CHANGE })

/* thunk creators */
export const fetchUser = () => (dispatch) => {
  Axios.get(`${api.url}/${api.endpoints.login}`, {
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  })
    .then((res) => {
      dispatch(changeUser({ ...res.data.user, logged: res.data.success }))
    })
    .catch((err) => {
      console.log('error fetchUser: ', err)
    })
}

export const requestLogout = () => (dispatch) => {
  Axios.get(`${api.url}/${api.endpoints.logout}`)
    .then(() => {
      dispatch(changeUser({ logged: false }))
    })
    .catch((err) => {
      console.log('error requestLogout: ', err)
    })
}

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE: {
      return { ...action.payload }
    }
    default:
      return statePart
  }
}
