import React from 'react';
import Modal from 'react-modal';
import TrailDataIndexItem from './trail_data_index_item';
import Pagination from 'react-js-pagination';
import TrailDataFormContainer from './trail_data_form_container';
import FindNearest from './find_nearest';

const createEditStyle = {
  overlay : {
  position        : 'fixed',
  top             : 0,
  left            : 0,
  right           : 0,
  bottom          : 0,
  backgroundColor : 'rgba(255, 255, 255, 0.3)',
  zIndex          : 50
},
  content : {
    position        : 'fixed',
    top             : '80px',
    width           : '405px',
    height          : '305px',
    borderRadius    : '0px',
    padding         : 0,
    margin          : '0 auto',
    zIndex          : 51,
    border          : '0',
    background      : 'rgba(99, 139, 138, 0.9)',
  }
}


class TrailDataIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      createData: false,
      page: 1,
      pageStart: 0,
      pageEnd: 15,
      search: "",
      currentMile: null,
      formType: null,
      findNearest: false
    };
    this._openCreate = this._openCreate.bind(this);
    this._handlePageClick = this._handlePageClick.bind(this);
    this._filter = this._filter.bind(this);
    this._openEdit = this._openEdit.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._openFindNearest = this._openFindNearest.bind(this);
    this.findNearest = this.findNearest.bind(this);
    this._skipPage = this._skipPage.bind(this);
  }

  _closeModal(){
    this.setState({createData: false})
  }

  _openCreate() {
    this.setState({createData: !this.state.createData, formType: 'create', currentMile: null});
  }

  _openFindNearest() {
    this.setState({findNearest: !this.state.findNearest});
  }

  _openEdit(mile) {
    this.setState({createData: !this.state.createData, currentMile: mile, formType: 'edit'})
  }

  _handlePageClick(e) {
    if(e > this.state.page){
      let diff = (e - this.state.page) * 15;
      this.setState({page: this.state.page + (e-this.state.page), pageStart: this.state.pageStart + diff, pageEnd: this.state.pageEnd + diff});
    }else if(e < this.state.page){
      let diff = (this.state.page - e) * 15;
      this.setState({page: this.state.page - (this.state.page - e), pageStart: this.state.pageStart - diff, pageEnd: this.state.pageEnd - diff});
    }

  }

  _filter(){
    return e => this.setState({search: e.target.value});
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.search != prevState.search){
      this.setState({page: 1, pageStart:0, pageEnd: 15});
    }
  }

  findNearest(start){
    if(Object.keys(this.props.trail).length === 0 || this.props.trail === undefined){
      alert('There are no mile markers on the map to find the nearest to')
      return;
    }
    let formatted = {}
    start.lat = parseFloat(start.lat);
    start.lon = parseFloat(start.lon);
    formatted.latitude = parseFloat(start.lat);
    formatted.longitude = parseFloat(start.lon);
    let haversine = require('haversine');
    let lowest = null;
    let result = null;
    let keys = Object.keys(this.props.trail);
    for (let i = 0; i < keys.length; i++) {
      let mark = this.props.trail[keys[i]];
      let coordinates = {latitude: mark.lat, longitude: mark.lon};
      let distance = haversine(formatted, coordinates)
      if(distance < lowest || lowest === null){
        lowest = distance;
        result = coordinates
      }
    }
    this.props.drawNearest(start, result);
  }

  noData(trail){
    if(this.state.search != "" && trail.length === 0){
      return <div id='no-data'>No mile markers found</div>
    }else if(Object.keys(this.props.trail).length === 0){
      return <div id='no-data'>No data loaded yet, click Load PCT to get started!</div>
    }else{
      return ""
    }
  }

  _skipPage(e){
    if(e.keyCode === 13){
      let num = parseInt(e.target.value);
      num > 0 ? this._handlePageClick(num) : alert('Page Number cannot be less than 1')
    }
  }




  render(){
    let trail = Object.keys(this.props.trail);
    if(this.state.search != ""){
      trail = trail.filter(key => key.startsWith(this.state.search));
    }else{
      trail = trail.sort((a,b) => a-b);
    }
    return(
      <div id="trail-data-component">
        <div className='mile-ui-container'>
          <div className='table-top'>
            <img src ='./assets/images/marker-plus.png' className ='create clickable' onClick={this._openCreate}/>
            <input type="text" id="search" onChange={this._filter()} placeholder="Search for mile markers"></input>
          </div>
          <table className= 'trail-data-details'>
            <thead className= 'trail-data-rows'>
              <tr>
                <th className='th-mile'>Mile</th>
                <th className='th-lat'>Latitude</th>
                <th className='th-lon'>Longitude</th>
                <th className='th-point'>Go to point</th>
                <th className='th-edit'>Edit</th>
                <th className='th-del'></th>
              </tr>
            </thead>
            {
              trail.length > 0 ?
                trail.slice(this.state.pageStart, this.state.pageEnd).map((mile, idx) =>
                <TrailDataIndexItem key={idx}
                                    mile={this.props.trail[mile]}
                                    update={this.props.updateTrailData}
                                    destroy={this.props.destroyTrailData}
                                    openEdit={this._openEdit.bind(this)}
                                    mapZoom={this.props.mapZoom}/>)
                : <tbody></tbody>
            }
          </table>

          {this.noData(trail)}
          <div className={Object.keys(this.props.trail).length > 0 ? 'paginate' : 'paginate hidden'}>
            <Pagination
              prevPageText='Previous'
              nextPageText='Next'
              firstPageText=''
              lastPageText=''
              activePage={this.state.page}
              itemsCountPerPage={15}
              totalItemsCount={trail.length}
              onChange={this._handlePageClick}
              innerClass={Object.keys(this.props.trail).length > 0 ? 'pagination' : 'pagination hidden'}
              hideDisabled={true}
            />
          <div className='skip-page'>
            <label><span>Page</span> <input type='text' onKeyUp={this._skipPage}></input>/{Math.ceil(trail.length/15)}</label>
          </div>
          </div>
        </div>
        <div className='features'>
          <button className='clickable' onClick={this.props.requestTrailData}>Load PCT</button>
          <button className='clickable' onClick={this._openFindNearest}>Find Nearest</button>
        </div>

        <Modal
          isOpen={this.state.createData}
          onRequestClose={this._closeModal}
          contentLabel="Modal"
          style={createEditStyle}
        >
          <TrailDataFormContainer formType={this.state.formType} modalClose = {this._openCreate.bind(this)} mile={this.state.currentMile}/>
        </Modal>

        <Modal
          isOpen={this.state.findNearest}
          onRequestClose={this._openFindNearest}
          contentLabel="Modal"
          style={createEditStyle}
        >
        <FindNearest modalClose = {this._openFindNearest.bind(this)} findNearest = {this.findNearest.bind(this)}/>
        </Modal>
      </div>
        );
      }
    }



export default TrailDataIndex;
