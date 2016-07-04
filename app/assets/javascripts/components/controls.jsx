const React = require('react');
const Trail = require('./trail.js');

const Controls = React.createClass({
  render() {
    return (
      <footer>
        <ul onClick={this.toggleOpen}>
          {this.props.children}
        </ul>
      </footer>
    );
  }
});

module.exports = Controls;
