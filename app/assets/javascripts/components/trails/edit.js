const React = require('react');
const Map = require('../map.jsx');
const Trail = require('../trail.js');

const Edit = React.createClass({
  getInitialState() {
    return {
      newMasterTrail: new Trail()
    };
  },

  componentDidMount() {
    $.get("/trails.json", (data) => {
      this.setState({trails: data});
    });

    $.get("/master_trails.json", (data) => {
      this.setState({masterTrails: data.master_trails.map((t) => new Trail(t))});
    });
  },

  save() {
    var latlngs = this.state.masterTrails.map((trail) => trail.saveData());
    latlngs.push(this.state.newMasterTrail.saveData());
    console.log(latlngs);

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

  render() {
    if (!this.state.trails) { return false; }
    if (!this.state.masterTrails) { return false; }

    return (
      <section id="demo" className="gpx" data-gpx-source="demo.gpx" data-map-target="demo-map">
        <article>
          <Map
            trails={this.state.trails}
            edit={true}
            showAll={true}
            showMarkers={this.props.location.query.showMarkers || false}
            newMasterTrail={this.state.newMasterTrail}
            masterTrails={this.state.masterTrails} />
        </article>
        <footer>
          <a onClick={this.save} className="fa fa-save save">Save</a>
          <a href="/trails/edit?showMarkers=false">Hide Markers</a>
        </footer>
      </section>
    );
  }
});

module.exports = Edit;
