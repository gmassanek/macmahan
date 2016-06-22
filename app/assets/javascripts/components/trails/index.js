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
    var map = L.map("demo-map");
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
      }).on('loaded', function(e) {
        var gpx = e.target;
        map.fitBounds(gpx.getBounds());
      }).addTo(map);
    });

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 19,
      id: 'mapbox.satellite',
      accessToken: 'pk.eyJ1IjoiZ21hc3NhbmVrIiwiYSI6ImNpcG82Yzd5NzAxNzlmcm5jaThhb2hheGkifQ.fiZgE5hrmUXwMeaQAOJiDg'
    }).addTo(map);

    var locator = L.control.locate({
      position: 'topright',
      drawCircle: false,
      drawMarker: true,
      setView: false,
      markerStyle: {
        weight: 10,
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
