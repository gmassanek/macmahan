const React = require('react');
import $ from "jquery";
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { render } from 'react-dom'

const TrailsIndex = require('./trails/index.js');
const TrailsEdit = require('./trails/edit.js');

$(function() {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={TrailsIndex}></Route>
      <Route path="/trails" component={TrailsIndex}></Route>
      <Route path="/trails/edit" component={TrailsEdit}></Route>
      <Route path="/trails/:master_trail_id/edit" component={TrailsEdit}></Route>
    </Router>
  ), document.getElementById('root'))
});
