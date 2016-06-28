const React = require('react');
const Map = require('../map.jsx');
const Trail = require('../trail.js');

const Master = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    $.get("/trails.json", (data) => {
      this.setState({trails: data});
    });

    $.get("/master_trails.json", (data) => {
      this.setState({masterTrails: data.map((t) => new Trail(t))});
    });
  },

  render() {
    if (!this.state.trails) { return false; }
    if (!this.state.masterTrails) { return false; }

    return (
      <section id="demo" className="gpx" data-gpx-source="demo.gpx" data-map-target="demo-map">
        <article>
          <Map
            trails={this.state.trails}
            edit={false}
            showAll={false}
            masterTrails={this.state.masterTrails} />
        </article>
      </section>
    );
  }
});

module.exports = Master;
