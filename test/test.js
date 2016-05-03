import { Menu, MenuItem } from "../lib/main";
import { Router, Route, Link, Redirect, hashHistory } from "react-router";
import ReactDOM from "react-dom";
import React from "react";

let createDummyComponent = function(label, index) {
  return React.createClass({
    render: function() { 
      // source http://emojicons.com/table-flipping
      // Internet is awesome
      var corpus = [
        'Vanilla (╯°□°)╯︵ ┻━┻',
        'Half way there ┬─┬﻿ ノ( ゜-゜ノ)',
        'Pudgy (ノ ゜Д゜)ノ ︵ ┻━┻',
        'In soviet Russia ┬─┬﻿ ︵ /(.□. \）',
        'Emotional (ﾉಥ益ಥ）ﾉ﻿ ┻━┻',
        'Magical (/¯◡ ‿ ◡)/¯ ~ ┻━┻'
      ];
      return ( 
        <div className="test-selected-contents">
          <h1>{label}</h1>
          <p>{corpus[index % corpus.length]}</p>
        </div> 
      )
    }
  })
}

let MyAppComponent = React.createClass({

  render: function() {
    return (
      <div>
        <Menu>
          <MenuItem className="menu-item" to="events">Events</MenuItem>
          <MenuItem className="menu-item" to="books">Books</MenuItem>
          <MenuItem className="menu-item" to="theater">Theater</MenuItem>
          <MenuItem className="menu-item" to="music">Music</MenuItem>
          <MenuItem className="menu-item" to="base">BASE jump</MenuItem>
          <MenuItem className="menu-item" to="chess">Chess</MenuItem>
          <MenuItem className="menu-item" to="go">Go</MenuItem>
          <MenuItem className="menu-item" to="cars">Cars</MenuItem>
        </Menu>
        { this.props.children }
      </div>
    )
  }

})

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={MyAppComponent}>
      <Route name="events" path="events" component={ createDummyComponent('events', 0) } />
      <Route name="books" path="books" component={ createDummyComponent('Books', 1) } />
      <Route name="theater" path="theater" component={ createDummyComponent('theater', 2) } />
      <Route name="music" path="music" component={ createDummyComponent('music', 3) } />
      <Route name="base" path="base" component={ createDummyComponent('BASE', 4) } />
      <Route name="chess" path="chess" component={ createDummyComponent('chess', 5) } />
      <Route name="go" path="go" component={ createDummyComponent('go', 6) } />
      <Route name="cars" path="cars" component={ createDummyComponent('cars', 7) } />
      <Redirect from="/" to="events" />
    </Route>
  </Router>, 
  document.getElementsByClassName('test-container')[0]
);
