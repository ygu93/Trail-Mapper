import React from 'react';
import ReactDOM from 'react-dom';
import isEqual from 'lodash/isEqual';


class Map extends React.Component{
  constructor(props){
    super(props);
    this.addMileMark = this.addMileMark.bind(this);
    this.createTrail = this.createTrail.bind(this);
    this.reCenter = this.reCenter.bind(this);
    this.drawNearestPath = this.drawNearestPath.bind(this);
    this.deleteNearestLine = this.deleteNearestLine.bind(this);
    this.state = {
      trail: null,
      marker: null,
      nearest: []
    }
  }

  componentDidMount(){
    const map = ReactDOM.findDOMNode(this.refs.map),
      options = {
        center: { lat: 37.9268676, lng: -119.04785156},
        zoom: 4
      }

    this.map = new google.maps.Map(map, options);
    window.addEventListener('resize', this.reCenter)
  }

  componentWillReceiveProps(nextProps){
    if(!isEqual(nextProps.trail, this.props.trail)){
      let keys = Object.keys(nextProps.trail).sort((a,b) => a - b);
      this.createTrail(keys, nextProps);
      keys = keys.map(key => this.addMileMark(nextProps.trail[key]))
      if(this.state.nearest.length > 0){
        this.deleteNearestLine();
      }
      if(this.state.marker!= null){
        this.state.marker.clearMarkers();
        this.state.marker.addMarkers(keys);
        this.state.marker.redraw();
      }else{
        let markerCluster = new MarkerClusterer(this.map, keys, {imagePath: './assets/marker_cluster/m'});
        this.setState({marker: markerCluster});
      }

    }else if(nextProps.map.zoom && (JSON.stringify(nextProps.map.zoom) != JSON.stringify(this.props.map.zoom) || this.map.getZoom()!= 17)){
      this.map.setZoom(17);
      this.map.panTo({lat:nextProps.map.zoom.lat, lng: nextProps.map.zoom.lon});
    }
    if(JSON.stringify(nextProps.map.nearest) != JSON.stringify(this.props.map.nearest)){
      this.drawNearestPath(nextProps);
    }
  }

  addMileMark(mile){
    const pos = new google.maps.LatLng(mile.lat, mile.lon)
      return new google.maps.Marker({
        position: pos,
        label: `${mile.mile}`
      });
  }

  drawNearestPath(nextProps){
    let near = nextProps.map.nearest;
    let coordinates = [{lat:near.point.lat, lng: near.point.lon}, {lat:near.nearest.latitude, lng: near.nearest.longitude}];
    let nearestPath = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: '#0000FF',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    let marker = new google.maps.Marker({
      position: {lat:near.point.lat, lng: near.point.lon},
      map: this.map,
      label: 'Start'
    });
    let marker2 = new google.maps.Marker({
      position: {lat:near.nearest.latitude, lng: near.nearest.longitude},
      map: this.map
    });
    let newNearest = this.state.nearest;
    newNearest.push({path: nearestPath, start: marker, end: marker2});
    this.setState({nearest:newNearest});
    nearestPath.setMap(this.map);
    this.map.setZoom(15);
    this.map.panTo({lat:near.nearest.latitude, lng: near.nearest.longitude});
  }

  deleteNearestLine(){
    let nearest = this.state.nearest;
    for (let i = 0; i < nearest.length; i++) {
      let near = nearest[i];
      near.path.setMap(null);
      near.start.setMap(null);
      near.end.setMap(null);
    }
    this.setState({nearest: []});
  }

  createTrail(keys, props){
    keys = keys.map(key =>{
      return { lat:props.trail[key].lat, lng: props.trail[key].lon }
    })
    let flightPath = new google.maps.Polyline({
      path: keys,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    if(this.state.trail != null){
      this.state.trail.setMap(null);
    }
    this.state.trail = flightPath;
    flightPath.setMap(this.map);
  }

  reCenter(){
    this.map.setCenter({ lat: 37.9268676, lng: -119.04785156})
  }



  render(){
    return(
      <div>
        <div id='map' ref='map'></div>
      </div>

    );
  }
}

export default Map;
