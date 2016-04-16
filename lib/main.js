import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

/**

  Menu will be rendered as a nav with nested links inside
  We are not using ul/li because 

  (a) it's a royal pain in the ass, and
  (b) https://css-tricks.com/navigation-in-lists-to-be-or-not-to-be/

*/
let Menu = React.createClass({

  componentWillMount: function() {
    this.setState({
      // are menu item widths already calculated
      itemWidthsKnown: false
    });
  },

  // invoked after rendering for the first time
  // the widths of all children will be calculated, and a second render will be triggered
  componentDidMount: function() {
    if (!this.state.itemWidthsKnown) {
      React.Children.map(this.props.children, (element, idx) => {
        let domNode = ReactDOM.findDOMNode(element);
        console.log(domNode.offsetWidth);
      })

      this.setState({
        itemWidthsKnown: true,
        containerWidth: ReactDOM.findDOMNode(this).offsetWidth
      })
    }
  },

  render: function() {
    let itemWidthsKnown = this.state.itemWidthsKnown;
    return (
      <nav className={"responsive-menu" + (itemWidthsKnown == 2? '' : ' hidden')}>
        {this.props.children}
      </nav>
    );
  }

});

export {
  Menu
}