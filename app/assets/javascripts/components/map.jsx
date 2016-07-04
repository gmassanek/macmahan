const React = require('react');
const Trail = require('./trail.js');
const Poi = require('./poi.js');
const Controls = require('./controls.jsx');
const isMobile = require('ismobilejs');

var subtleRedIcon = L.divIcon({className: 'subtle-red-marker-icon'});

const Map = React.createClass({
  getInitialState() {
    return {
      showHikes: false,
      showPois: true,
      gpx: [],
      currentHike: new Poi(),
      tiles: L.tileLayer.bing('An3IeTTNxvYWS0JG5Yhb4kmNcWAthZGtNYkaURMzm-Nz6iGSZ-cgImqYhSTwxCt9'),
      locator: L.control.locate({
        position: 'topright',
        drawCircle: true,
        drawMarker: true,
        setView: false,
        markerStyle: {
          color: '#ff4d4d',
          fillColor: '#ff4d4d',
          fillOpactiy: 1
        },
        circleStyle: {
          color: '#ff4d4d',
          fillColor: '#ff4d4d',
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

    this.addLocationDot(map);
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

        trail.polyline.on('click', () => {
          window.location = `/trails/${trail.id}/edit`
        })
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
    if(isMobile.any) { this.state.locator.start(); }
  },

  showTrailsText() {
    if(this.state.showHikes) {
      return 'Hide Hikes';
    } else {
      return 'Show Hikes';
    }
  },

  showPOIText() {
    if(this.state.showPois) {
      return 'Hide Points of Interest';
    } else {
      return 'Show Points of Interest';
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

  togglePOI() {
    if (this.state.showPois) {
      this.props.pois.map((poi) => { poi.marker.remove(); });
    } else {
      this.props.pois.map((poi) => { poi.marker.addTo(this.state.map); });
    };

    this.setState({ showPois: !this.state.showPois });
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
    if(this.state.showPois) {
      this.renderPois();
    }
  },

  render() {
    return (
      <article>
        <div className="map" id="demo-map"></div>;
        <Controls tagline={this.state.tagline}>
          <li onClick={this.toggleHikes}>
            {this.showTrailsText()}
          </li>

          <li onClick={this.togglePOI}>
            {this.showPOIText()}
          </li>

          {this.saveButton()}
        </Controls>
      </article>
    );
  }
});

module.exports = Map;
