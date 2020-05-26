import { LISTSPACE } from './../actions/actionTypes';

const initialState = {
  places: {
    id: '',
    address: {
      lat: 0,
      lng: 0
    }

  },
  placeByName: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTSPACE.FETCH_SUCCESS:
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
