import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";
import { FaRegSave } from "react-icons/fa";
import { RiDeleteBin6Line, RiFolderDownloadLine } from "react-icons/ri";
import { ImPencil } from "react-icons/im";
import "./Contextmenu.css";

const RightClickMenu = ({
  id,
  contextId,
  contextDepth,
  selectedMenus,
  deleteItem,
  addSubmenu,
  loadTreeFromDb,
  renameItem,
  saveTree,
  depth,
}) => {
  const handleDelete = (e, data, target) => {
    deleteItem(data.contextId, data.contextDepth);
  };
  const handleAddSubmenu = (e, data, target) => {
    addSubmenu(data.contextId, data.contextDepth);
  };
  const handleRename = (e, data) => {
    renameItem(data.contextId, data.contextDepth);
  };
  const handleLoadTreeFromDb = (e, data, target) => {
    loadTreeFromDb(data.contextId, data.contextDepth);
  };
  const handleSaveTree = (e, data, target) => {
    saveTree();
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
          data={{
            id: "contextId",
            contextId: contextId,
            contextDepth: contextDepth,
          }}
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
