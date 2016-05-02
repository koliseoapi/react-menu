import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import throttle from "lodash.throttle";

/**

  A Link

*/
const MenuItem = React.createClass({

  render: function() {
    return ( <Link ref="link" activeClassName="active"{...this.props}>{this.props.children}</Link> )
  }

});

/**

  The three-dot dropdown

*/
const KebabMenu = React.createClass({

  render: function() {
    const { children } = this.props;
    return (
      <div className={ "kebab-menu" + (!children || !children.length? ' hidden' : '') }>
        <a className="kebab-menu-button">
          <div className="kebab-menu-button-dot"></div>
          <div className="kebab-menu-button-dot"></div>
          <div className="kebab-menu-button-dot"></div>
        </a>
        {children}
      </div>
    );
  }

});

/**

  Menu will be rendered as a nav with nested links inside
  We are not using ul/li because 

  (a) it's a royal pain in the ass, and 
  (b) https://css-tricks.com/navigation-in-lists-to-be-or-not-to-be/

*/
let Menu = React.createClass({

  getInitialState: function() {
    window.addEventListener('resize', this.onResize, false);
    return {
      elementWidths: null
    };
  },

  // calculate the widths of all children, and trigger render again 
  componentDidMount: function() {
    let elementWidths = this.state.elementWidths;
    if (!elementWidths) {
      // index of the currently selected menu item, 0 if none
      let selectedIndex = 0; 

      // array of widths of each menu item
      // const elementWidths = Object.keys(this.refs).map((ref, index) => {
      const domNode = ReactDOM.findDOMNode(this);

      // width where we should make the menu fit
      const menuContainerWidth = this.getMenuContainerWidth();
      const elementWidths = Array.prototype.map.call(domNode.children, function(childDomNode, index) {
        const ew = childDomNode.offsetWidth;
        if (childDomNode.classList.contains('active')) {
          selectedIndex = index
        }
        return ew;
      });
      this.setState({ 
        elementWidths, 
        selectedIndex,
        menuContainerWidth
      })
    }
  },

  getMenuContainerWidth: function() {
    const domNode = ReactDOM.findDOMNode(this);
    const kebabNode = ReactDOM.findDOMNode(this.refs.kebabMenu);
    return domNode.offsetWidth
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.onResize, false);
  },

  // recalculate menu layout on window resize
  onResize: throttle(function() {
    this.setState({ 
      menuContainerWidth: this.getMenuContainerWidth()
    })
  }, 200, { leading: false }),

  render: function() {
    console.log('rendering');
    const { elementWidths, selectedIndex, menuContainerWidth } = this.state;
    const children = this.props.children;

    // menu items to be displayed on the left
    let menuItems = [];

    // menu items to be collapsed on the right
    let kebabMenuItems = [];

    if (elementWidths) {

      // accumulated widths of menu items displayed on the left
      let accWidth = 0;

      // find the item currently selected and all items that may fit
      React.Children.map(children, function (element, index) {
        const copy = React.cloneElement(element, { key: '__' + index });

        if (index >= selectedIndex && ((accWidth += elementWidths[index]) <= menuContainerWidth)) {
          // if we are counting from left, and elements still fit
          menuItems.push(copy);
        } else {
          // otherwise next under kebab menu
          kebabMenuItems.push(copy);
        }
      });

    } else {
      menuItems = children;
    }


    return (
      <nav ref="menu" className={"responsive-menu" + (!this.state.elementWidths? ' hidden' : '')}>
        { menuItems }
        <KebabMenu ref="kebabMenu">{ kebabMenuItems }</KebabMenu>
      </nav>
    );
  }

});

export {
  Menu, MenuItem
}