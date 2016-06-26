const React = require('react');

const Index = React.createClass({
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
      zoom: 15,
      maxZoom: 22,
    }).addTo(map);

    // drop a dot on the map for current location
    var locator = L.control.locate({
      position: 'topright',
      drawCircle: false,
      drawMarker: true,
      setView: false,
      markerStyle: {
        weight: 12,
        color: '#ff4d4d'
      }
    }).addTo(map);
    locator.start();
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
