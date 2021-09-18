import axios from 'axios'
import {
  SEARCH_WORD_FAILURE,
  SEARCH_WORD_REQUEST,
  SEARCH_WORD_SUCCESS,
} from '../actionTypes/ActionTypes'

const SearchAction = (word) => async (dispatch) => {
  dispatch({ type: SEARCH_WORD_REQUEST })
  try {
    const res = await axios.get(
      `https://dict6244.herokuapp.com/api/search/${word}`
    )

    dispatch({
      type: SEARCH_WORD_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: SEARCH_WORD_FAILURE,
      payload: error.message,
    })
  }
}

export default SearchAction
