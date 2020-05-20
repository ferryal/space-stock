import { combineReducers } from 'redux';
import { reducer as listSpace } from './reducer/listSpace';
import { reducer as detailSpace } from './reducer/detailSpace';

export default combineReducers({
  listSpace,
  detailSpace
});
