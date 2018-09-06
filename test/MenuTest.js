import React from "react";
import renderer from "react-test-renderer";

import { HashRouter } from "react-router-dom";
import { Menu, MenuItem } from "../lib/main";

describe("Menu", () => {
  function createNodeMock(element) {
    const {
      props: { className }
    } = element;
    if (className === "kebab-menu") {
      return {
        offsetWidth: 10
      };
    } else if (className === "responsive-menu hidden") {
      return {
        parentElement: {
          offsetWidth: 30
        },
        children: [
          {
            offsetWidth: 20
          },
          {
            offsetWidth: 20
          }
        ]
      };
    }
    console.log(element);
    return {};
  }
  it("renders for authenticated user", () => {
    const tree = renderer.create(
      <HashRouter>
        <Menu>
          <MenuItem to="/foo" />
          <MenuItem to="/bar" />
        </Menu>
      </HashRouter>,
      { createNodeMock }
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
