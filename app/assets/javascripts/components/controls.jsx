const React = require('react');
const Trail = require('./trail.js');

const Controls = React.createClass({
  getInitialState() {
    return {
      open: false,
      recording: false,
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
      <ul className='expandable'>
        {this.props.children}
      </ul>
    );
  },

  recordingIcon() {
    if (this.state.recording) {
      return 'fa fa-square recording';
    } else {
      return 'fa fa-circle stopped';
    }
  },

  record() {
    if (this.state.recording) {
      this.setState({recording: false})
      this.props.saveHike()
    } else {
      this.setState({recording: true})
      this.props.record()
    }
  },

  render() {
    return (
      <footer>
        <ul className='always'>
          <li><a onClick={this.record}><div className={this.recordingIcon()}></div></a></li>
          <li><a onClick={this.toggleOpen} className={this.openClass()}><div className='fa fa-cog'></div></a></li>
        </ul>
        {this.renderOptions()}
      </footer>
    );
  }
});

module.exports = Controls;
