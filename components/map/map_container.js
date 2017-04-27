import Map from './map';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  trail: state.trail,
  map: state.map
});


export default connect(mapStateToProps)(Map);
