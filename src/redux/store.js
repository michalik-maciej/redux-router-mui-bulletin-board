import { applyMiddleware, combineReducers, createStore } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import initialState from './initialState'
import postsReducer from './postsRedux'
import thunk from 'redux-thunk'

// define reducers
const reducers = {
  posts: postsReducer,
}

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach((item) => {
  if (typeof reducers[item] === 'undefined') {
    reducers[item] = (statePart = null) => statePart
  }
})

const combinedReducers = combineReducers(reducers)

// create store
const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export { store }
