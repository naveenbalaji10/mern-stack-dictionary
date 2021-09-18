import { combineReducers, createStore, applyMiddleware } from 'redux'
import SearchReducer from './actionreducers/SearchReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export const rootReducer = combineReducers({
  search: SearchReducer,
})
const wordsStorage = localStorage.getItem('words')
  ? JSON.parse(localStorage.getItem('words'))
  : []

const initial_state = {
  search: {
    words: wordsStorage,
  },
}
export const store = createStore(
  rootReducer,
  initial_state,
  composeWithDevTools(applyMiddleware(thunk))
)
