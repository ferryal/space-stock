import { LISTSPACE } from './../actions/actionTypes';

const initialState = {
  places: {},
  placeByName: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTSPACE.FETCH_SUCCESS:
        console.log(action.payload.data);
      return {
        ...state,
        places: action.payload.data
      };
    case LISTSPACE.SEARCH_SUCCESS:
      return {
        ...state,
        placeByName: action.payload.data
      };
    default:
      return state;
  }
};
