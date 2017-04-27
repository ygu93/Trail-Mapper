import {combineReducers} from 'redux';
import TrailDataReducer from './trail_data_reducer';
import MapReducer from './map_reducer';


export default combineReducers({
  trail: TrailDataReducer,
  map: MapReducer
});
