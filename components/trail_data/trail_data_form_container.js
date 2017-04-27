import TrailDataForm from './trail_data_form';
import {connect} from 'react-redux';
import {createTrailData, editTrailData} from '../../actions/trail_data_actions';

const mapStateToProps = state => ({
  trail: state.trail
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: (data, type, id) => (type === 'create' ? dispatch(createTrailData(data)) : dispatch(editTrailData(data, id))),
  mile: ownProps.mile,
  formType: ownProps.formType,
  modalClose: ownProps.modalClose
});

export default connect(mapStateToProps, mapDispatchToProps)(TrailDataForm);
