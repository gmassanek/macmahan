const React = require('react');
const Map = require('../map.jsx');
const Trail = require('../trail.js');
const Poi = require('../poi.js');
const Controls = require('../controls.jsx');

const Edit = React.createClass({
  getInitialState() {
    var newMasterTrail;
    if (!this.props.params.master_trail_id) {
      newMasterTrail = new Trail();
    }

    return {
      newMasterTrail: newMasterTrail
    };
  },

  componentDidMount() {
    $.get("/trails.json", (data) => {
      this.setState({trails: data});
    });

    if (this.props.params.master_trail_id) {
      $.get(`/master_trails/${this.props.params.master_trail_id}.json`, (data) => {
        const trail = new Trail(data.master_trail);
        this.setState({ masterTrails: [trail], newMasterTrail: trail});
      });
    } else {
      $.get("/master_trails.json", (data) => {
        this.setState({masterTrails: data.master_trails.map((t) => new Trail(t, true))});
      });
    }

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
          edit={true}
          showMarkers={this.props.location.query.showMarkers || false}
          showLocation={false}
          newMasterTrail={this.state.newMasterTrail}
          masterTrails={this.state.masterTrails}
          pois={this.state.pois} >

          <Controls>
            <li>
              <a onClick={this.save}>Save</a>
            </li>
          </Controls>
        </Map>
      </section>
    );
  }
});

module.exports = Edit;
