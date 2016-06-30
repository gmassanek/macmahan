const React = require('react');
const Map = require('../map.jsx');
const Trail = require('../trail.js');
const Poi = require('../poi.js');
const Controls = require('../controls.jsx');

const Index = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    $.get("/trails.json", (data) => {
      this.setState({trails: data});
    });

    $.get("/master_trails.json", (data) => {
      this.setState({masterTrails: data.master_trails.map((t) => new Trail(t))});
    });

    $.get("/pois.json", (data) => {
      this.setState({pois: data.pois.map((t) => new Poi(t))});
    });
  },

  render() {
    if (!this.state.trails) { return false; }
    if (!this.state.masterTrails) { return false; }
    if (!this.state.pois) { return false; }

    return (
      <section id="demo" className="gpx" data-gpx-source="demo.gpx" data-map-target="demo-map">
        <Map
          trails={this.state.trails}
          edit={false}
          showLocation={true}
          masterTrails={this.state.masterTrails}
          pois={this.state.pois} >

        </Map>
      </section>
    );
  }
});

module.exports = Index;
