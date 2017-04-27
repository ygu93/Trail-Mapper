import {connect} from 'react-redux';
import TrailDataIndex from './trail_data_index';
import {requestTrailData, createTrailData, updateTrailData, destroyTrailData} from '../../actions/trail_data_actions';
import { requestMapZoom, drawNearest } from '../../actions/map_actions';


 const mapStateToProps = state => ({
   trail: state.trail
 });

 const mapDispatchToProps = (dispatch) => ({
   requestTrailData: () => dispatch(requestTrailData()),
   createTrailData: (trailData) => dispatch(createTrailData(trailData)),
   updateTrailData: (id) => dispatch(updateTrailData(id)),
   destroyTrailData: (trailData) => dispatch(destroyTrailData(trailData)),
   mapZoom: (trailData) => dispatch(requestMapZoom(trailData)),
   drawNearest: (point, nearestPoint) => dispatch(drawNearest(point, nearestPoint))

 });

 export default connect(mapStateToProps, mapDispatchToProps)(TrailDataIndex);
