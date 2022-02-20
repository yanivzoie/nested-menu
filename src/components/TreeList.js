import React, { Fragment, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { ContextMenuTrigger } from "react-contextmenu";
import "./Tree.css";

const TreeList = ({ tree, depth = 0 }) => {
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const icon = !isTreeOpen ? <IoChevronDown /> : <IoChevronUp />;

  const handleMenuSelection = (id, depth) => {
    setSelectedMenus((prevSelectedMenus) => {
      const newSelectedMenus = [...prevSelectedMenus];
      newSelectedMenus[depth] = id;

      // close when clicking on the same menu
      if (selectedMenus[depth] === id) {
        newSelectedMenus.length = depth;
      }
      return newSelectedMenus;
    });
  };

  return (
    <Fragment>
      {Array.isArray(tree) &&
        tree.map((item) => (
          <ContextMenuTrigger
            id="contextmenu"
            key={item.id}
            contextId={item.id}
            collect={(p) => p}
            contextDepth={depth + 1}
          >
            <div className="container">
              <div
                className="tree"
                onClick={() => {
                  setIsTreeOpen((prev) => !prev);
                  handleMenuSelection(item.id, depth);
                }}
              >
                <span>{item.label}</span>
                {item.branches !== undefined && icon}
              </div>
              {/*Base Case*/}
              {item.branches && selectedMenus[depth] === item.id && (
                <div className="sub">
                  <TreeList
                    id={item.id}
                    tree={item.branches}
                    depth={depth + 1}
                    selectedMenus={selectedMenus}
                  />
                </div>
              )}
            </div>
          </ContextMenuTrigger>
        ))}
    </Fragment>
  );
};

export default TreeList;
