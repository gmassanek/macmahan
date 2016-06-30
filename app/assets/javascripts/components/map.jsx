const React = require('react');
const Trail = require('./trail.js');
const Poi = require('./poi.js');
const Controls = require('./controls.jsx');

var subtleRedIcon = L.divIcon({className: 'subtle-red-marker-icon'});

const Map = React.createClass({
  getInitialState() {
    return {
      showHikes: false,
      gpx: [],
      currentHike: new Poi(),
      tiles: L.tileLayer('https://api.mapbox.com/styles/v1/gmassanek/ciprs7pi3000cbonocianj06b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ21hc3NhbmVrIiwiYSI6ImNpcG82Yzd5NzAxNzlmcm5jaThhb2hheGkifQ.fiZgE5hrmUXwMeaQAOJiDg', {
        zoom: 18,
        maxZoom: 19,
      }),
      locator: L.control.locate({
        position: 'topright',
        drawCircle: false,
        drawMarker: true,
        setView: false,
        markerStyle: {
          weight: 10,
          color: '#ff4d4d'
        },
        locateOptions: {
          enableHighAccuracy: true,
          watch: true,
        }
      })
    };
  },

  componentDidMount() {
    const zoom = 15;
    const map = L.map("demo-map").setView([43.843, -69.7095], zoom);


    if(this.props.showLocation) { this.addLocationDot(map); };
    this.state.tiles.addTo(map);

    $('#demo').addClass(`zoom-${zoom}`);
    map.on('zoomend', (e) => {
      $('#demo').removeClass(`zoom-${e.target._zoom + 1}`);
      $('#demo').removeClass(`zoom-${e.target._zoom - 1}`);
      $('#demo').addClass(`zoom-${e.target._zoom}`);
    });

    this.setState({
      map: map,
      polyline: L.polyline([], {color: 'red', weight: 5}),
    });
  },

  componentDidUpdate() {
    this.renderMap();
  },

  fetchTrails() {
    if (this.state.gpx.length) { return; }

    $.each(this.props.trails, (i, trail) => {
      var mapName = trail.file;
      var url = '/trails/' + mapName + '.gpx';
      var gpx = new L.GPX(url, {
        async: true,
        marker_options: {
          startIconUrl: '',
          endIconUrl: '',
          shadowUrl: ''
        },
        polyline_options: trail.lineStyle,
      })
      gpx.addTo(this.state.map);
      this.state.gpx.push(gpx)
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

  addLocationDot(map) {
    this.state.locator.addTo(map);
    this.state.locator.start();
  },

  showTrailsText() {
    if(this.state.showHikes) {
      return 'Hide Hikes';
    } else {
      return 'Show Hikes';
    }
  },

  toggleHikes() {
    if (this.state.showHikes) {
      this.state.gpx.map((trail) => { trail.remove(); });
    } else {
      this.state.gpx.map((trail) => { trail.addTo(this.state.map); });
    };

    this.setState({ showHikes: !this.state.showHikes });
  },

  saveButton() {
    if (this.props.edit) {
      return (<li onClick={this.save}>Save</li>)
    }
  },

  renderPois() {
    this.props.pois.map((poi) => {
      poi.marker.addTo(this.state.map)
    });
  },

  edit() {
    window.location = '/trails/edit';
  },

  save() {
    var latlngs = this.props.masterTrails.map((trail) => trail.saveData());
    latlngs.push(this.props.newMasterTrail.saveData());

    $.ajax({
      type: 'POST',
      url: '/master_trails/save',
      contentType: 'application/json',
      data: JSON.stringify(latlngs),
      success: () => {
        window.location = '/trails';
      },
    });
  },

  renderMap() {
    this.addMasterTrails();
    if(this.props.edit) {
      this.setupEditMode();
    }
    if(this.state.showHikes) {
      this.fetchTrails();
    }
    this.renderPois();
  },

  render() {
    return (
      <article>
        <div className="map" id="demo-map"></div>;
        <Controls tagline={this.state.tagline}>
          <li onClick={this.toggleHikes}>
            {this.showTrailsText()}
          </li>
          {this.saveButton()}
        </Controls>
      </article>
    );
  }
});

module.exports = Map;
