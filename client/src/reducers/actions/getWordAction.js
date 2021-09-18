import axios from 'axios'
import { GET_WORD_SUCCESS, GET_WORD_FAILURE } from '../actionTypes/ActionTypes'
const getWords = () => async (dispatch) => {
  try {
    const data = await axios.get('https://dict6244.herokuapp.com/')
    dispatch({
      type: GET_WORD_SUCCESS,
      payload: data,
    })
    localStorage.setItem('words', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: GET_WORD_FAILURE, payload: error.message })
  }
}
export default getWords
