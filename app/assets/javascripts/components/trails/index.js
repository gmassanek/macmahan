const React = require('react');
const Trail = require('../trail.js');

const Index = React.createClass({
  getDefaultProps() {
    return {
      masterTrail: new Trail,
    };
  },

  componentDidMount() {
    $.get("/trails.json", (data) => {
      this.setState({trails: data});
    });
  },

  componentDidUpdate() {
    this.renderMap();
  },

  renderMap() {
    // Build map
    var map = L.map("demo-map").setView([43.843, -69.7095], 15);

    // retrieve all trails
    $.each(this.state.trails, function(i, trail) {
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
      }).addTo(map);
    });

    // put the map tiles on the map
    L.tileLayer('https://api.mapbox.com/styles/v1/gmassanek/ciprs7pi3000cbonocianj06b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ21hc3NhbmVrIiwiYSI6ImNpcG82Yzd5NzAxNzlmcm5jaThhb2hheGkifQ.fiZgE5hrmUXwMeaQAOJiDg', {
      zoom: 18,
      maxZoom: 19,
    }).addTo(map);

    // drop a dot on the map for current location
    var locator = L.control.locate({
      position: 'topright',
      drawCircle: false,
      drawMarker: true,
      setView: false,
      markerStyle: {
        weight: 15,
        color: '#ff4d4d'
      }
    }).addTo(map);
    locator.start();

    var polyline = L.polyline([], {color: 'red'}).addTo(map);
    var blueIcon = L.icon({
      iconUrl: 'images/marker-icon.png',
      iconRetinaUrl: 'images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [-3, -76],
    });

    var deleteIcon = L.icon({
      iconUrl: 'images/marker-icon-delete.png',
      iconRetinaUrl: 'images/marker-icon-delete.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [-3, -76],
    });

    var dragging = false;
    map.on('singleclick', (e) => {
      if (dragging) { return; }

      const marker = L.marker(e.latlng, {
        clickable: true,
        draggable: true,
        icon: blueIcon,
      })

      marker.on('click', ()=> {
        dragging = false;
        map.removeLayer(marker);
        this.props.masterTrail.remove(marker._leaflet_id)
        polyline.setLatLngs(this.props.masterTrail.latlng());
      });

      marker.on('mouseout', ()=> {
        marker.setIcon(blueIcon);
      });

      marker.on('mouseover', ()=> {
        marker.setIcon(deleteIcon);
      });

      var dragend = (e)=> {
        marker.off('dragend');

        this.props.masterTrail.set(marker._leaflet_id, marker.getLatLng())
        polyline.setLatLngs(this.props.masterTrail.latlng());

        setTimeout(() => {
          dragging = false;
        }, 200);
      }

      marker.on('dragstart', (e)=> {
        marker.on('dragend', dragend);
        dragging = true;
      });

      marker.addTo(map);

      this.props.masterTrail.add(marker._leaflet_id, marker.getLatLng())
      polyline.setLatLngs(this.props.masterTrail.latlng());
    });
  },

  render() {
    return (
      <section id="demo" className="gpx" data-gpx-source="demo.gpx" data-map-target="demo-map">
        <article>
          <div className="map" id="demo-map"></div>
        </article>
      </section>
    );
  }
});

module.exports = Index;
