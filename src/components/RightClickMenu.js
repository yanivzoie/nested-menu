import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { FaRegSave } from "react-icons/fa";
import { RiDeleteBin6Line, RiFolderDownloadLine } from "react-icons/ri";
import { ImPencil } from "react-icons/im";
import "./Contextmenu.css";

const RightClickMenu = ({
  id,
  selectedMenus,
  deleteItem,
  addSubmenu,
  loadTreeFromDb,
  renameItem,
  saveTree,
  depth,
}) => {
  const handleDelete = (e, data, target) => {
    deleteItem(e, data.contextId, data.depth, selectedMenus);
  };
  const handleAddSubmenu = (e, data, target) => {
    addSubmenu(e, data.contextId, data.depth, selectedMenus);
  };
  const handleRename = (e, data, target) => {
    renameItem(e, data.contextId, data.depth, selectedMenus);
  };
  const handleLoadTreeFromDb = (e, data, target) => {
    loadTreeFromDb(e, data);
  };
  const handleSaveTree = (e, data, target) => {
    saveTree(e, data);
  };
  return (
    <div>
      <ContextMenu id="contextmenu">
        <MenuItem
          data={{ id: "contextId", depth: depth, selectedMenus: selectedMenus }}
          onClick={handleLoadTreeFromDb}
        >
          <RiFolderDownloadLine className="load" />
          <span>Load</span>
        </MenuItem>
        <MenuItem
          data={{ id: "contextId", depth: depth, selectedMenus: selectedMenus }}
          onClick={handleAddSubmenu}
        >
          <ImPencil className="load" />
          <span>Add Submenu</span>
        </MenuItem>
        <MenuItem
          data={{ id: "contextId", depth: depth, selectedMenus: selectedMenus }}
          onClick={handleRename}
        >
          <ImPencil className="rename" />
          <span>Rename</span>
        </MenuItem>
        <MenuItem onClick={() => handleSaveTree(id)}>
          <FaRegSave className="save" />
          <span>Save</span>
        </MenuItem>
        <MenuItem
          data={{ id: "contextId", depth: depth, selectedMenus: selectedMenus }}
          onClick={handleDelete}
        >
          <RiDeleteBin6Line className="delete" />
          <span>Delete</span>
        </MenuItem>
      </ContextMenu>
    </div>
  );
};

export default RightClickMenu;
