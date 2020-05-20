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
    console.log('masuk sini');
  return (dispatch) => {
    axios.get('http://localhost:3001/place')
    .then((res) => {
        if (res.status === 200) {
            console.log('masuk sini 2');
            console.log(res);
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