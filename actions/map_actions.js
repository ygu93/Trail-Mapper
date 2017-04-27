export const REQUEST_MAP_ZOOM ='REQUEST_MAP_ZOOM';
export const DRAW_NEAREST = 'DRAW_NEAREST';


export const requestMapZoom = (trailData) => ({
  type: REQUEST_MAP_ZOOM,
  trailData
});

export const drawNearest = (point, nearestPoint) => ({
  type: DRAW_NEAREST,
  point,
  nearestPoint
});
