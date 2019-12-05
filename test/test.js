import { Menu, MenuItem } from "../lib/main";
import { HashRouter, Route, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import React from "react";

let createDummyComponent = function(label, index) {
  return function() {
    // source http://emojicons.com/table-flipping
    // Internet is awesome
    var corpus = [
      "Vanilla (╯°□°)╯︵ ┻━┻",
      "Half way there ┬─┬﻿ ノ( ゜-゜ノ)",
      "Pudgy (ノ ゜Д゜)ノ ︵ ┻━┻",
      "In soviet Russia ┬─┬﻿ ︵ /(.□. ）",
      "Emotional (ﾉಥ益ಥ）ﾉ﻿ ┻━┻",
      "Magical (/¯◡ ‿ ◡)/¯ ~ ┻━┻"
    ];
    return (
      <div>
        <h1>{label}</h1>
        <p>{corpus[index % corpus.length]}</p>
      </div>
    );
  };
};

function MyAppComponent(props) {
  return (
    <div>
      <Menu>
        <MenuItem className="menu-item" to="events">
          Events
        </MenuItem>
        <MenuItem className="menu-item" to="books">
          Books
        </MenuItem>
        <MenuItem className="menu-item" to="theater">
          Theater
        </MenuItem>
        <MenuItem className="menu-item" to="music">
          Music
        </MenuItem>
        <MenuItem className="menu-item" to="base">
          BASE jump
        </MenuItem>
        <MenuItem className="menu-item" to="chess">
          Chess
        </MenuItem>
        <MenuItem className="menu-item" to="go">
          Go
        </MenuItem>
        <MenuItem className="menu-item" to="cars">
          Cars
        </MenuItem>
      </Menu>
      <div id="my-workspace" className="test-selected-contents">
        {props.children}
      </div>
    </div>
  );
}

function Router() {
  return (
    <HashRouter>
      <MyAppComponent>
        <Route path="/events" component={createDummyComponent("events", 0)} />
        <Route path="/books" component={createDummyComponent("Books", 1)} />
        <Route path="/theater" component={createDummyComponent("theater", 2)} />
        <Route path="/music" component={createDummyComponent("music", 3)} />
        <Route path="/base" component={createDummyComponent("BASE", 4)} />
        <Route path="/chess" component={createDummyComponent("chess", 5)} />
        <Route path="/go" component={createDummyComponent("go", 6)} />
        <Route path="/cars" component={createDummyComponent("cars", 7)} />
        <Redirect from="/" to="/events" />
      </MyAppComponent>
    </HashRouter>
  );
}
ReactDOM.render(
  <Router />,
  document.getElementsByClassName("test-container1")[0]
);
ReactDOM.render(
  <Router />,
  document.getElementsByClassName("test-container2")[0]
);
