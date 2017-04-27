import React from 'react';
import TrailDataIndexContainer from './trail_data/trail_data_index_container';
import MapContainer from './map/map_container';

const App = ({ children }) => (
  <div>
    <h1 id='logo'><img src='./assets/images/logo.png'></img></h1>
    <div id="app">
      <MapContainer/>
      <TrailDataIndexContainer/>
    </div>
  </div>
);

export default App;
