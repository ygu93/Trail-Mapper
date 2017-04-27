import React from 'react';
import TrailDataFormContainer from './trail_data_form_container';

class TrailDataIndexItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      edit:false,
    };
  }




  render(){
    let mile = this.props.mile;
    return(
      <tbody>
        <tr className='trail-index-item'>
          <td>{mile.mile}</td>
          <td>{mile.lat}</td>
          <td>{mile.lon}</td>
          <td onClick={this.props.mapZoom.bind(this, mile)}><i className="fa fa-map-marker fa-lg clickable" aria-hidden="true"></i></td>
          <td onClick={this.props.openEdit.bind(this, mile)}><i className="fa fa-edit fa-lg clickable" aria-hidden="true"></i></td>
          <td onClick={this.props.destroy.bind(this, mile.mile)}><i className="fa fa-close fa-lg clickable" aria-hidden="true"></i></td>
        </tr>

      </tbody>



    );
  }
}

export default TrailDataIndexItem;
