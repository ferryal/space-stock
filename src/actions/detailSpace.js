import axios from 'axios';
import { DETAILSPACE } from './actionTypes';

function fetchDetailSuccess(data) {
  return {
    type: DETAILSPACE.FETCH_SUCCESS,
    payload: { data }
  };
}

function fetchFailed(data) {
  return {
    type: DETAILSPACE.FETCH_FAILED,
    payload: { data }
  };
}

export function fetchDetailSpace(id) {
  return (dispatch) => {
    axios.get(`http://localhost:3001/place/${id}`)
    .then((res) => {
        if (res.status === 200) {
        dispatch(fetchDetailSuccess(res.data));
        } else {
        dispatch(fetchFailed());
        }
    })
    .catch(() => {
        dispatch(fetchFailed());
    });
  };
}

