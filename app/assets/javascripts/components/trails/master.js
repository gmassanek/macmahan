const React = require('react');
const Map = require('../map.jsx');
const Trail = require('../trail.js');
const Hike = require('../hike.js');

const Master = React.createClass({
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

    $.get("/hikes.json", (data) => {
      this.setState({hikes: data.hikes.map((t) => new Hike(t))});
    });
  },

  render() {
    if (!this.state.trails) { return false; }
    if (!this.state.masterTrails) { return false; }
    if (!this.state.hikes) { return false; }

    return (
      <section id="demo" className="gpx" data-gpx-source="demo.gpx" data-map-target="demo-map">
        <Map
          trails={this.state.trails}
          edit={false}
          showAll={false}
          masterTrails={this.state.masterTrails}
          hikes={this.state.hikes} />
      </section>
    );
  }
});

module.exports = Master;
