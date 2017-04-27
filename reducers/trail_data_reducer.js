import {
        RECEIVE_TRAIL_DATA,
        REMOVE_TRAIL_DATA,
        UPDATE_TRAIL_DATA,
        RECEIVE_ALL_TRAIL_DATA
        } from '../actions/trail_data_actions';
import merge from 'lodash/merge';



const TrailDataReducer = (state={}, action) => {
  Object.freeze(state);
  let dup = merge({}, state);
  switch(action.type){
    case RECEIVE_ALL_TRAIL_DATA:
      return merge({}, state, action.trailData);
    case RECEIVE_TRAIL_DATA:
      dup[action.trailData.mile] = action.trailData;
      return dup;
    case REMOVE_TRAIL_DATA:
      delete dup[action.trailData];
      return dup;
    case UPDATE_TRAIL_DATA:
      delete dup[action.id]
      dup[action.trailData.mile] = action.trailData;
      return dup;
    default:
      return state;
  }
};


export default TrailDataReducer;
