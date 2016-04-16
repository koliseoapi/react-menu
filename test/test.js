import { Menu } from "../lib/main";
import { Router, Route, Link, Redirect, hashHistory } from "react-router";
import ReactDOM from "react-dom";
import React from "react";

let createDummyComponent = function(label) {
  return React.createClass({
    render: function() { 
      return <div className="test-selected-contents">{label}</div> 
    }
  })
}

let MyAppComponent = React.createClass({

  render: function() {
    return (
      <div>
        <Menu>
          <Link className="menu-item" to="events">Events</Link>
          <Link className="menu-item" to="books">Books</Link>
          <Link className="menu-item" to="theater">Theater</Link>
          <Link className="menu-item" to="music">Music</Link>
          <Link className="menu-item" to="base">BASE jump</Link>
          <Link className="menu-item" to="chess">Chess</Link>
          <Link className="menu-item" to="go">Go</Link>
          <Link className="menu-item" to="cars">Cars</Link>
        </Menu>
        { this.props.children }
      </div>
    )
  }

})

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={MyAppComponent}>
      <Route name="events" path="events" component={ createDummyComponent('events') } />
      <Route name="books" path="books" component={ createDummyComponent('Books') } />
      <Route name="theater" path="theater" component={ createDummyComponent('theater') } />
      <Route name="music" path="music" component={ createDummyComponent('music') } />
      <Route name="base" path="base" component={ createDummyComponent('BASE') } />
      <Route name="chess" path="chess" component={ createDummyComponent('chess') } />
      <Route name="go" path="go" component={ createDummyComponent('go') } />
      <Route name="cars" path="cars" component={ createDummyComponent('cars') } />
      <Redirect from="/" to="events" />
    </Route>
  </Router>, 
  document.getElementsByClassName('test-container')[0]
);
