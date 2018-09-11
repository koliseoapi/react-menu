import React from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import throttle from "lodash/throttle";
import bindAll from "lodash/bindAll";

/**

  A Link

*/
const MenuItem = function(props) {
  return (
    <NavLink
      activeClassName="active"
      className={props.className || "menu-item"}
      {...props}
    >
      {props.children}
    </NavLink>
  );
};

/**

  The three-dot dropdown

*/
class KebabMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // true to display the drop-down options
      popupVisible: false,
      // hack to check if the component has been mounted
      // https://github.com/facebook/react/issues/3417
      // on the first render we cannot set the hidden class because we need its width on the parent menu componentDidMount
      mounted: false
    };
    bindAll(this, ["bodyClick", "switchPopupVisible"]);
  }

  switchPopupVisible() {
    this.setState({
      popupVisible: !this.state.popupVisible
    });
  }

  bodyClick(e) {
    if (this.state.popupVisible) {
      this.setState({
        popupVisible: false
      });
    }
  }

  componentDidMount() {
    document.body.addEventListener("click", this.bodyClick);
    this.state.mounted = true;
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.bodyClick);
  }

  render() {
    const { children, className } = this.props;
    const { popupVisible, mounted } = this.state;

    return (
      <div
        className={
          className +
          ((!children || !children.length) && mounted ? " hidden" : "")
        }
      >
        <a className="kebab-menu-button" onClick={this.switchPopupVisible}>
          <span className="kebab-menu-button-dot" />
          <span className="kebab-menu-button-dot" />
          <span className="kebab-menu-button-dot" />
        </a>

        <div
          className={className + "-contents" + (popupVisible ? "" : " hidden")}
        >
          <div className="before" />
          {children}
        </div>
      </div>
    );
  }
}

/**

  Menu will be rendered as a nav with nested links inside
  We are not using ul/li because 

  (a) it's a royal pain in the ass, and 
  (b) https://css-tricks.com/navigation-in-lists-to-be-or-not-to-be/

*/
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementWidths: null
    };
    bindAll(this, ["getMenuContainerWidth", "onResize"]);
    this.myRef = React.createRef();
  }

  // calculate the widths of all children, and trigger render again
  componentDidMount() {
    window.addEventListener("resize", this.onResize, false);
    let elementWidths = this.state.elementWidths;
    if (!elementWidths) {
      // array of widths of each menu item
      // const elementWidths = Object.keys(this.refs).map((ref, index) => {
      const domNode = this.myRef.current;

      // width where we should make the menu fit
      const menuContainerWidth = this.getMenuContainerWidth();
      elementWidths = Array.prototype.map.call(domNode.children, function(
        childDomNode,
        index
      ) {
        const ew = childDomNode.offsetWidth;
        return ew;
      });
      this.setState({
        elementWidths,
        menuContainerWidth
      });
    }
  }

  getMenuContainerWidth() {
    const width = this.myRef.current.parentElement.offsetWidth;
    const kebabWidth = 40;
    return width - kebabWidth;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize, false);
  }

  // recalculate menu layout on window resize
  onResize() {
    const setContainerWidth = throttle(
      () => {
        this.setState({
          menuContainerWidth: this.getMenuContainerWidth()
        });
      },
      200,
      { leading: false }
    );
    setContainerWidth();
  }

  render() {
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
      React.Children.map(children, function(element, index) {
        // if it's not a string
        if (React.isValidElement(element)) {
          const copy = React.cloneElement(element, { key: "__" + index });

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
      <nav
        className={
          (className || "responsive-menu") +
          (!this.state.elementWidths ? " hidden" : "")
        }
        ref={this.myRef}
      >
        {menuItems}
        <KebabMenu className={popupClassName || "kebab-menu"}>
          {kebabMenuItems}
        </KebabMenu>
      </nav>
    );
  }
}

export { Menu, MenuItem };
