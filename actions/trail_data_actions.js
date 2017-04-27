export const REQUEST_TRAIL_DATA ='REQUEST_TRAIL_DATA';
export const RECEIVE_TRAIL_DATA = 'RECEIVE_TRAIL_DATA';
export const EDIT_TRAIL_DATA = 'EDIT_TRAIL_DATA';
export const UPDATE_TRAIL_DATA = 'UPDATE_TRAIL_DATA';
export const DESTROY_TRAIL_DATA = 'DESTROY_TRAIL_DATA';
export const REMOVE_TRAIL_DATA = 'REMOVE_TRAIL_DATA';
export const CREATE_TRAIL_DATA = 'CREATE_TRAIL_DATA';
export const RECEIVE_TRAIL_DATA_ERRORS = 'RECEIVE_TRAIL_DATA_ERRORS';
export const RECEIVE_ALL_TRAIL_DATA = 'RECEIVE_ALL_TRAIL_DATA';


export const requestTrailData = () => ({
  type: REQUEST_TRAIL_DATA
});

export const receiveTrailData = (trailData) => ({
  type: RECEIVE_TRAIL_DATA,
  trailData
});

export const receiveAllTrailData = (trailData) => ({
  type: RECEIVE_ALL_TRAIL_DATA,
  trailData
})

export const updateTrailData = (id, trailData) => ({
  type: UPDATE_TRAIL_DATA,
  id,
  trailData
});

export const destroyTrailData = (trailData) => ({
  type:DESTROY_TRAIL_DATA,
  trailData
});


export const editTrailData = (trailData, id) => ({
  type:EDIT_TRAIL_DATA,
  trailData,
  id
});

export const removeTrailData = (trailData) => ({
  type: REMOVE_TRAIL_DATA,
  trailData
});


export const createTrailData= (trailData) => ({
  type: CREATE_TRAIL_DATA,
  trailData
});


export const receiveTrailDataErrors =  (errors) => ({
  type: RECEIVE_TRAIL_DATA_ERRORS,
  errors
});
