const React = require('react');
const Trail = require('./trail.js');

const Controls = React.createClass({
  getInitialState() {
    return {
      open: false,
    }
  },

  toggleOpen() {
    this.setState({ open: !this.state.open })
  },

  openClass() {
    if(this.state.open) {
      return ' open';
    } else {
      return ' closed';
    }
  },

  renderOptions() {
    //if (!this.state.open) { return; }

    return (
      <ul>
        {this.props.children}
      </ul>
    );
  },

  render() {
    return (
      <footer>
        <a onClick={this.toggleOpen} className={this.openClass()}><div className='fa fa-cog'></div></a>
        {this.renderOptions()}
      </footer>
    );
  }
});

module.exports = Controls;
