import axios from 'axios';
import { LISTSPACE } from './actionTypes';

function fetchListSuccess(data) {
  return {
    type: LISTSPACE.FETCH_SUCCESS,
    payload: { data }
  };
}

function fetchFailed(data) {
  return {
    type: LISTSPACE.FETCH_FAILED,
    payload: { data }
  };
}

function searchSuccess(data) {
  return {
    type: LISTSPACE.SEARCH_SUCCESS,
    payload: { data }
  };
}

export function fetchListSpace() {
  return (dispatch) => {
    axios.get('https://rest-space.herokuapp.com/place')
    .then((res) => {
        if (res.status === 200) {
        dispatch(fetchListSuccess(res.data));
        } else {
        dispatch(fetchFailed());
        }
    })
    .catch(() => {
        dispatch(fetchFailed());
    });
  };
}

export function searchSpace(name) {
  return (dispatch) => {
    axios.get(`http://localhost:3001/place?=${name}`)
    .then((res) => {
        if (res.status === 200) {
        dispatch(searchSuccess(res.data));
        } else {
        dispatch(fetchFailed());
        }
    })
    .catch(() => {
        dispatch(fetchFailed());
    });
  };
}