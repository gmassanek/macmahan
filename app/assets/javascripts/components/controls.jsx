const React = require('react');
const Trail = require('./trail.js');

const Controls = React.createClass({
  getInitialState() {
    return {
      open: false,
      recording: false,
      recorded: false,
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
    } else if (this.state.recorded) {
      return 'fa fa-save';
    } else {
      return 'fa fa-circle stopped';
    }
  },

  record() {
    if (this.state.recording) {
      this.setState({recording: false, recorded: true})
      this.props.stopHike()
    } else if (this.state.recorded) {
      this.setState({recording: false, recorded: false})
      this.props.saveHike()
    } else {
      this.setState({recording: true})
      this.props.record()
    }
  },

  cancelRecording() {
    this.setState({recording: false, recorded: false})
    this.props.cancelHike()
  },

  trashRecordingView() {
    if (this.state.recorded) {
      return <li><a onClick={this.cancelRecording}><div className='fa fa-trash'></div></a></li>;
    }
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
          {this.trashRecordingView()}
          <li><a onClick={this.record}><div className={this.recordingIcon()}></div></a></li>
          <li><a onClick={this.toggleOpen} className={this.openClass()}><div className='fa fa-cog'></div></a></li>
        </ul>
        {this.renderOptions()}
      </footer>
    );
  }
});

module.exports = Controls;
