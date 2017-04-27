import {
        REQUEST_TRAIL_DATA,
        DESTROY_TRAIL_DATA,
        CREATE_TRAIL_DATA,
        EDIT_TRAIL_DATA,
        receiveTrailData,
        removeTrailData,
        receiveTrailDataErrors,
        updateTrailData,
        receiveAllTrailData
      } from  '../actions/trail_data_actions';




const TrailDataMiddleware = ({dispatch}) => next => action => {

  switch(action.type){
    case REQUEST_TRAIL_DATA:
      let TrailData = require('../pct-data.json');
      let trailDataObject = {};
      TrailData.forEach((data) => {
        trailDataObject[data[0]] = {mile: data[0], lat: data[1], lon: data[2]}
      });
      dispatch(receiveAllTrailData(trailDataObject));
      return next(action);
    case EDIT_TRAIL_DATA:
      let keys1 = Object.keys(action.trailData);
      for (let i = 0; i < keys1.length; i++) {
        action.trailData[keys1[i]] = parseFloat(action.trailData[keys1[i]]);
      }
      dispatch(updateTrailData(action.id, action.trailData));
      return next(action);
    case DESTROY_TRAIL_DATA:
      dispatch(removeTrailData(action.trailData));
      return next(action);
    case CREATE_TRAIL_DATA:
      let keys = Object.keys(action.trailData);
      for (let i = 0; i < keys.length; i++) {
        action.trailData[keys[i]] = parseFloat(action.trailData[keys[i]]);
      }
      dispatch(receiveTrailData(action.trailData));
      return next(action);
    default:
      return next(action);
  }

};

export default TrailDataMiddleware;
