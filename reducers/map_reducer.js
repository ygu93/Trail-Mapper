import {
        RECEIVE_TRAIL_DATA,
        REMOVE_TRAIL_DATA,
        UPDATE_TRAIL_DATA,
        } from '../actions/trail_data_actions';

import { REQUEST_MAP_ZOOM, DRAW_NEAREST} from '../actions/map_actions';
import merge from 'lodash/merge';



const MapReducer = (state={}, action) => {
  Object.freeze(state);
  let dup = merge({}, state);
  switch(action.type){
    case RECEIVE_TRAIL_DATA:
      dup.add = action.trailData;
      return dup;
    case REMOVE_TRAIL_DATA:
      dup.delete = action.trailData;
      return dup;
    case UPDATE_TRAIL_DATA:
      dup.update = action.trailData;
      return dup;
    case REQUEST_MAP_ZOOM:
      dup.zoom = action.trailData;
      return dup;
    case DRAW_NEAREST:
      dup.nearest = {point: action.point, nearest: action.nearestPoint}
      return dup;
    default:
      return state;
  }
};


export default MapReducer;
