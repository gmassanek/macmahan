const React = require('react');
const Trail = require('./trail.js');

var subtleRedIcon = L.divIcon({className: 'subtle-red-marker-icon'});

const Map = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    this.setState({
      map: L.map("demo-map").setView([43.843, -69.7095], 15),
      polyline: L.polyline([], {color: 'red', weight: 5}),
    });
  },

  componentDidUpdate() {
    this.renderMap();
  },

  fetchAndMapTrails() {
    $.each(this.props.trails, (i, trail) => {
      var mapName = trail.file;
      var url = '/trails/' + mapName + '.gpx';
      new L.GPX(url, {
        async: true,
        marker_options: {
          startIconUrl: '',
          endIconUrl: '',
          shadowUrl: ''
        },
        polyline_options: trail.lineStyle,
      }).addTo(this.state.map);
    });
  },

  addMasterTrails() {
    if (!this.props.masterTrails) { return };


    this.props.masterTrails.map((trail) => {

      if (this.props.edit) {
        trail.serverData.data.map((latlng) => {
          const marker = this.addMarkerToMap(latlng, trail);
          trail.add(marker._leaflet_id, marker.getLatLng())
        });
      }
      trail.polyline.addTo(this.state.map);
    });
  },

  setupEditMode() {
    this.dragging = false;
    this.props.newMasterTrail.polyline.addTo(this.state.map)

    this.state.map.on('singleclick', (e) => {
      if (this.dragging) { return; }

      const marker = this.addMarkerToMap(e.latlng, this.props.newMasterTrail);
      this.props.newMasterTrail.add(marker._leaflet_id, marker.getLatLng())
    });
  },

  addMarkerToMap(latlng, trail) {
    var options;

    if(this.props.showMarkers === 'false') {
      options = {
        interactive: false,
        opacity: 0,
        draggable: false,
        clickable: false
      };
    } else {
      options = {
        clickable: true,
        draggable: true,
        icon: subtleRedIcon,
      };
    }

    const marker = L.marker(latlng, options)

    marker.on('click', ()=> {
      this.dragging = false;
      this.state.map.removeLayer(marker);
      trail.remove(marker._leaflet_id)
    });

    marker.on('mouseout', ()=> {
      marker.setIcon(subtleRedIcon);
    });

    var dragend = (e)=> {
      marker.off('dragend');

      trail.set(marker._leaflet_id, marker.getLatLng())

      setTimeout(() => {
        this.dragging = false;
      }, 200);
    }

    marker.on('dragstart', (e)=> {
      marker.on('dragend', dragend);
      this.dragging = true;
    });

    marker.addTo(this.state.map);

    return marker;
  },

  addMapTiles() {
    L.tileLayer('https://api.mapbox.com/styles/v1/gmassanek/ciprs7pi3000cbonocianj06b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ21hc3NhbmVrIiwiYSI6ImNpcG82Yzd5NzAxNzlmcm5jaThhb2hheGkifQ.fiZgE5hrmUXwMeaQAOJiDg', {
      zoom: 18,
      maxZoom: 19,
    }).addTo(this.state.map);
  },

  addLocationDot() {
    var locator = L.control.locate({
      position: 'topright',
      drawCircle: false,
      drawMarker: true,
      setView: false,
      markerStyle: {
        weight: 15,
        color: '#ff4d4d'
      }
    }).addTo(this.state.map);
    locator.start();
  },

  renderMap() {
    this.addMapTiles();
    this.addMasterTrails();
    if(this.props.edit) {
      this.setupEditMode();
    } else {
      this.addLocationDot();
    };
    if(this.props.showAll) {
      this.fetchAndMapTrails();
    }
  },

  render() {
    return <div className="map" id="demo-map"></div>;
  }
});

module.exports = Map;
