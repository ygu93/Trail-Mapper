# Trail Mapper
[Live link](https://ygu93.github.io/Trail-Mapper/)

Trail Mapper is an app that allows users to load their mile marker lat/long coordinates to see a visualization of their trail. For the simplicity of this project, this will be demonstrated with the mile markers of the [Pacific Crest Trail](http://en.wikipedia.org/wiki/Pacific_Crest_Trail)

## Technologies
For this project I chose to use React with Redux. In addition to my familiarity with the technology, React allows for the creation of a single page application, which is very important for the functionality of adding/deleting/editing mile markers. I chose to use Redux to have a centralized data store for my components. In this case, the components are the Map and the Mile UI. By having a central store, the Map component can detect any changes in the mile marker UI and react accordingly. Redux also allows for communication between the two components. The mile marker can request actions such as zooming into a specific point to the map.  

## Features

### Mile Marker UI

The PCT data is loaded in to my redux store as an Object of Objects instead of its initial formatting of an array of arrays.
Example below
```
  {
    0.5: { mile: 0.5, lat:32.58971, lon:-116.46696 },
    1: { mile: 1, lat:32.60058, lon: -116.47008 }
  }

```
 This is to take advantage of a Hash's O(1) lookup time, which will prove useful when we want to update this object. Deleting will be O(1) instead of O(N) as well as any scenarios where I need to lookup a specific mile marker. Using the mile markers as keys also gives me not allowing duplicate mile markers because you cannot have duplicate keys in an object. Mile markers should be unique because along a trail, you should only reach the one mile marker at one specific point. It makes no sense why there would be two one mile markers on a trail.

The Mile Marker UI allows users to have CRUD(create, read, update, delete) functionality over the mile markers. This is accomplished through React with Redux data flow. For a basic example of redux, the user submits the form => app dispatches action to request to create a mile marker => store updates with my new mile marker => a changed store triggers a re render. Although usually a backend is used for error handling, I added basic error handling with alerts to not allow for invalid mile markers. Currently, the app checks for blank values, invalid values(not a number), lat and long outside of valid ranges, and existing mile markers because mile markers are unique and you cannot have two mile markers to denote the 0.5 mile mark.

In addition to the basic CRUD functions, I have also added a go to point feature. Upon clicking the icon, this takes the user directly to the point on the map. This is to provide a better user experience because finding a specific data point out of over five thousand would otherwise be difficult.

The other features I added into the mile marker UI are pagination and search. Similar to the previously mentioned feature, 5000+ data points is extremely difficult to navigate so I decided to let the user navigate however they prefer. The first is simple pagination where users go through pages of details. Since the page numbers are in the hundreds, I added a quick access feature if they want to go to a specific page. Pagination is all accomplished using the slice method in JavaScript so while I am loading all the data, I am only choosing to display a set number. Lastly, I added a search function which takes a user input and searches the data based on the name of the mile marker(0.5, 1, etc)

The last feature is a find nearest feature which finds the nearest PCT marker given a starting lat long coordinate. This is accomplished with the Haversine formula, which find the distance between two lat long points. The map will be zoomed in to the answer and a blue line will be drawn between the given coordinate and the closest PCT marker.


### Map
The 5000+ data points of the PCT trail is constructed using marker clusters. I decided to use marker clusters because regular markers create a worse visual due to the amount of PCT markers. With marker clusters, users see a small amount of markers rather than 5000+ markers when zoomed out and can zoom in to see a more specific marker.  Marker clusters are also more efficient, it takes 1-2ms to create a cluster for 1000 data points as opposed to 10ms using regular markers.

The PCT trail is drawn by creating a simple Polyline between all the markers. When a mile marker is changed in whatever way, the Map will detect the change and delete the old Polyline and redraw a new Polyline with the new points. This also deletes any Find Nearest lines because the closest PCT marker may have been the one just deleted.
