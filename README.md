# React Rug Menu

This responsive menu will hide any options that don't fit in the screen into 
a popup menu ("under the rug"). It also works while resizing the window.

Inspired in [OkayNav](https://github.com/VPenkov/okayNav), but developed for 
React and React Router. 

## Use

Nest `MenuItem` as if it were a `Link` tag, and nest all items inside of `Menu`. 

```
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
      <Redirect from="/" to="events" />
    </Route>
  </Router>, 
  document.getElementsByClassName('test-container')[0]
);
```