import React from 'react';

class TrailDataForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      mile: this.props.mile ? this.props.mile.mile : "" ,
      lat: this.props.mile ? this.props.mile.lat : "",
      lon: this.props.mile ? this.props.mile.lon : ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.errorCheck = this.errorCheck.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const mile = this.state;
    const lat = parseFloat(mile.lat);
    const lon = parseFloat(mile.lon);
    if(this.errorCheck(mile)){
      alert('All inputs must be a number and not blank');
      return;
    }else if(this.props.trail[parseFloat(mile.mile)] && this.props.formType === 'create'){
      alert('This Mile marker already exists');
      return;
    }else if(this.props.trail[parseFloat(mile.mile)] && this.props.formType === 'edit' && mile.mile != this.props.mile.mile){
      alert('This Mile marker already exists');
      return;
    }else if(lat > 90 || lat < -90 || lon > 180 || lon < -180 ){
      alert('Invalid Longitude or Latitude value, Longitude must be +/- 180 and Latitude must be +/- 90');
      return;
    }else if(this.props.formType === 'edit'){
      let keys = Object.keys(mile);
      this.props.processForm(mile, this.props.formType, this.props.mile.mile);
      this.props.modalClose();
    }else{
      let keys = Object.keys(mile);
      this.props.processForm(mile, this.props.formType);
      this.props.modalClose();
    }

  }

  errorCheck(mile){
    let keys = Object.keys(mile);
    for (let i = 0; i < keys.length; i++) {
      if(mile[keys[i]] === "" || isNaN(parseFloat(mile[keys[i]]))){
        return true;
      }
    }
    return false;
  }

  updateForm(label){
    return e => this.setState({[label]: e.target.value});
  }







  render(){
    return(
      <div className='trail-data-form'>
        <div className='close-modal' onClick={this.props.modalClose}>
          <i className='fa fa-close fa-lg clickable' aria-hidden="true"></i>
        </div>
        <h2>{this.props.formType === 'edit' ? 'Edit Mile Mark': 'Create Mile Mark'}</h2>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="mile">
            <input type='text' onChange={this.updateForm('mile')} defaultValue={this.props.mile ? this.props.mile.mile : ""} placeholder="Mile"></input>
          </label>
          <label htmlFor="lat">
            <input type='text' onChange={this.updateForm('lat')} defaultValue={this.props.mile ? this.props.mile.lat : ""}  placeholder="Latitude"></input>
          </label>
          <label htmlFor="lon">
            <input type='text' onChange={this.updateForm('lon')} defaultValue={this.props.mile ? this.props.mile.lon : ""} placeholder="Longitude"></input>
          </label>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default TrailDataForm;
