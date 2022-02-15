import React, { Fragment, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { ContextMenuTrigger } from "react-contextmenu";
import RightClickMenu from "./RightClickMenu";
import "./Tree.css";

const TreeList = ({
  tree,
  renameItem,
  saveTree,
  addSubmenu,
  loadTreeFromDb,
  deleteItem,
  handleMenuSelection,
  selectedMenus,
  depth = 0,
}) => {
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const { id, label, branches = [] } = tree;

  return (
    <Fragment>
      {branches.length > 0 ? (
        <div>
          <ContextMenuTrigger
            className="context"
            id="contextmenu"
            contextId={tree.id}
            depth={depth}
            selectedMenus={selectedMenus}
            collect={(p) => p}
          >
            <div
              className="tree"
              onClick={() => {
                setIsTreeOpen((prev) => !prev);
                handleMenuSelection(id, depth, branches);
              }}
            >
              <RightClickMenu
                deleteItem={() => deleteItem(depth)}
                addSubmenu={() => addSubmenu(depth)}
                renameItem={() => renameItem(depth)}
                saveTree={() => saveTree(depth)}
                loadTreeFromDb={loadTreeFromDb}
              />
              {isTreeOpen ? (
                <span>
                  {label}
                  <IoChevronUp />
                </span>
              ) : (
                <span>
                  {label}
                  <IoChevronDown />
                </span>
              )}
            </div>
          </ContextMenuTrigger>

          {selectedMenus[depth] === id && (
            <div className="sub" depth={depth}>
              {branches.map((child, index) => {
                const childDepth = depth + 1;
                return (
                  <TreeList
                    id={child.id}
                    tree={child}
                    handleMenuSelection={handleMenuSelection}
                    key={child.id}
                    depth={childDepth}
                    selectedMenus={selectedMenus}
                    deleteItem={deleteItem}
                    renameItem={renameItem}
                    loadTreeFromDb={loadTreeFromDb}
                    saveTree={saveTree}
                    addSubmenu={addSubmenu}
                  />
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <ContextMenuTrigger
          id="contextmenu"
          contextId={tree.id}
          collect={(p) => p}
        >
          <div
            className="tree"
            onClick={() => handleMenuSelection("", depth, tree)}
          >
            <RightClickMenu
              deleteItem={deleteItem}
              renameItem={renameItem}
              loadTreeFromDb={loadTreeFromDb}
              saveTree={saveTree}
              addSubmenu={addSubmenu}
            />
            <li>{label}</li>
          </div>
        </ContextMenuTrigger>
      )}
    </Fragment>
  );
};
export default TreeList;
