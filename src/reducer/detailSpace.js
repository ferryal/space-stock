import { DETAILSPACE } from './../actions/actionTypes';

const initialState = {
  detail: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAILSPACE.FETCH_SUCCESS:
      return {
        ...state,
        detail: action.payload.data
      };
    default:
      return state;
  }
};
