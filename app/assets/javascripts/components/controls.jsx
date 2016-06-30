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
    if (!this.state.open) { return; }

    return (
      <ul className='expandable' onClick={this.toggleOpen}>
        {this.props.children}
      </ul>
    );
  },

  tagline() {
    if(this.props.tagline) {
      return (
        <li className='text'>
          {this.props.tagline}
        </li>
      );
    }
  },

  render() {
    return (
      <footer>
        <ul className='always'>
          {this.tagline()}
          <li><a onClick={this.toggleOpen} className={this.openClass()}><div className='fa fa-cog'></div></a></li>
        </ul>
        {this.renderOptions()}
      </footer>
    );
  }
});

module.exports = Controls;
