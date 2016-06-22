const React = require('react');
import $ from "jquery";
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { render } from 'react-dom'

const TrailsIndex = require('./trails/index.js');

$(function() {
  render((
    <Router history={browserHistory}>
      <Route path="/trails" component={TrailsIndex}></Route>
    </Router>
  ), document.getElementById('root'))
});
