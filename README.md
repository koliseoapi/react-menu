# React Rug Menu

This responsive menu will hide any options that don't fit in the screen into 
a popup menu ("under the rug"). It also works while resizing the window.

<a href="http://koliseoapi.github.io/react-rug-menu/">
<img src="http://koliseoapi.github.io/react-rug-menu/Screencast.mp4.gif" title="Click to go to the demo page">
</a>

Inspired in [OkayNav](https://github.com/VPenkov/okayNav), but developed for 
React and React Router. The module itself is tiny (below 200 lines).

## Use

Use `MenuItem` as if it were a `Link` tag, and nest all items inside of `Menu`. 

```
import { Menu, MenuItem } from "../lib/main";
import { Router, Route, hashHistory } from "react-router";
import ReactDOM from "react-dom";
import React from "react";

let MyAppComponent = React.createClass({

  render: function() {
    return (
      <div>
        <Menu>
          <MenuItem className="menu-item" to="events">Events</MenuItem>
          <MenuItem className="menu-item" to="books">Books</MenuItem>
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
      <Route name="events" path="events" component={ eventComponent } />
      <Route name="books" path="books" component={ bookComponent } />
      <Route name="go" path="go" component={ goComponent } />
      <Route name="cars" path="cars" component={ carComponent } />
    </Route>
  </Router>, 
  document.getElementsByClassName('test-container')[0]
);
```

## Develop

```bash
npm i

npm run build

npm run watch
```

There is no `build` step. The library is a single file in `lib/main.js` and published as is.