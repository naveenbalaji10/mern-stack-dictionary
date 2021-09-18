import {
  SEARCH_WORD_REQUEST,
  SEARCH_WORD_SUCCESS,
  SEARCH_WORD_FAILURE,
  GET_WORD_SUCCESS,
  GET_WORD_FAILURE,
} from '../actionTypes/ActionTypes'

const initialState = {
  words: [],
  searchwords: [],
}
const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_WORD_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SEARCH_WORD_SUCCESS:
      return {
        ...state,
        loading: true,
        searchwords: action.payload,
      }
    case SEARCH_WORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case GET_WORD_SUCCESS:
      return {
        ...state,
        loading: false,
        words: action.payload,
      }
    case GET_WORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
export default SearchReducer
