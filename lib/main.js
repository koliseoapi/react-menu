import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import throttle from "lodash/throttle";

/**

  A Link

*/
const MenuItem = React.createClass({

  render: function() {
    return ( <Link ref="link" activeClassName="active" className={ this.props.className || 'menu-item'} {...this.props}>{this.props.children}</Link> )
  }

});

/**

  The three-dot dropdown

*/
const KebabMenu = React.createClass({

  getInitialState: function() {
    return {
      // true to display the drop-down options
      popupVisible: false
    };
  },

  switchPopupVisible: function() {
    this.setState({
      popupVisible: !this.state.popupVisible
    })
  },

  bodyClick: function(e) {
    if (this.state.popupVisible) {
      this.setState({
        popupVisible: false
      });
    }
  },

  componentDidMount: function() {
    document.body.addEventListener('click', this.bodyClick);
  },

  componentWillUnmount: function () {
    document.body.removeEventListener('click', this.bodyClick);
  },


  render: function() {
    const { children, className } = this.props;
    const { popupVisible } = this.state;

    return (
      <div className={ className + (!children || !children.length? ' hidden' : '') }>
        <a className="kebab-menu-button" onClick={this.switchPopupVisible}>
          <span className="kebab-menu-button-dot"></span>
          <span className="kebab-menu-button-dot"></span>
          <span className="kebab-menu-button-dot"></span>
        </a>

        <div className={ className + '-contents' + (popupVisible? '' : ' hidden')}>
          <div className="before"></div>
          {children}
        </div>
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

      // array of widths of each menu item
      // const elementWidths = Object.keys(this.refs).map((ref, index) => {
      const domNode = ReactDOM.findDOMNode(this);

      // width where we should make the menu fit
      const menuContainerWidth = this.getMenuContainerWidth();
      elementWidths = Array.prototype.map.call(domNode.children, function(childDomNode, index) {
        const ew = childDomNode.offsetWidth;
        return ew;
      });
      this.setState({ 
        elementWidths, 
        menuContainerWidth
      })
    }
  },

  getMenuContainerWidth: function() {
    let width = ReactDOM.findDOMNode(this).parentElement.offsetWidth;
    const kebabRef = this.refs.kebabMenu;
    return width - (!kebabRef? 0 : ReactDOM.findDOMNode(kebabRef).offsetWidth);
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
    const { elementWidths, menuContainerWidth } = this.state;
    const { children, className, popupClassName } = this.props;

    // menu items to be displayed on the left
    let menuItems = [];

    // menu items to be collapsed on the right
    let kebabMenuItems = [];

    if (elementWidths) {

      // accumulated widths of menu items displayed on the left
      let accWidth = 0;

      // identify all items that may fit
      React.Children.map(children, function (element, index) {
        // if it's not a string
        if (React.isValidElement(element)) {
          const copy = React.cloneElement(element, { key: '__' + index });

          if ((accWidth += elementWidths[index]) <= menuContainerWidth) {
            // if elements still fit
            menuItems.push(copy);
          } else {
            // otherwise next under kebab menu
            kebabMenuItems.push(copy);
          }
        }
      });

    } else {
      menuItems = children;
    }


    return (
      <nav ref="menu" className={(className || "responsive-menu") + (!this.state.elementWidths? ' hidden' : '')}>
        { menuItems }
        <KebabMenu ref="kebabMenu" className={ popupClassName || 'kebab-menu'}>{ kebabMenuItems }</KebabMenu>
      </nav>
    );
  }

});

export {
  Menu, MenuItem
}
