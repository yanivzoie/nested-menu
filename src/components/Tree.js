import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { mockData } from "../data";
import FormDialog from "./FormDialog";
import TreeList from "./TreeList";
import RightClickMenu from "./RightClickMenu";

const URL =
  "https://nested-menu-1cecc-default-rtdb.europe-west1.firebasedatabase.app/menu.json";
const Tree = () => {
  const [tree, setTree] = useState([]);
  const [isAddSubmenuDialogOpen, setIsAddSubmenuDialogOpen] = useState(false);
  const [isEditSubmenuDialogOpen, setIsEditSubmenuDialogOpen] = useState(false);
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  useEffect(() => {
    fetchDataFromDb().then((result) => {
      setTree(result.data);
    });
  }, []);

  const fetchDataFromDb = async () => {
    try {
      return await axios.get(URL);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = (id) => {
    const removeTreeItem = (list, id) => {
      return list
        .map((item) => {
          return { ...item };
        })
        .filter((item) => {
          if ("branches" in item) {
            item.branches = removeTreeItem(item.branches, id);
          }
          return item.id !== id;
        });
    };
    const newTree = removeTreeItem(tree, id);
    setTree(newTree);
  };

  const handleSaveTree = async () => {
    const response = await axios.put(URL, tree);
    return response;
  };
  const handleLoadTreeFromDb = async () => {
    const result = await fetchDataFromDb();
    if (result) setTree(result.data);
  };

  const handleAddSubmenu = (id) => {
    setIsAddSubmenuDialogOpen((prev) => !prev);
    setEdit({ id: id, value: "" });
  };
  const onAddSubmenuSubmit = (newValue) => {
    const newId = edit.id;
    const iterate = (obj) => {
      Object.keys(obj).map((key) => {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          obj[key].id === newId &&
            setTree([...tree], (obj[key].label = newValue.label));
          iterate(obj[key]);
          if (obj[key].length === 0) return null;
        }
      });
    };
    iterate(tree);
  };

  const handleRenameItem = (id) => {
    setIsEditSubmenuDialogOpen((prev) => !prev);
    setEdit({ id: id, value: "" });
  };
  const onEditSubmenuSubmit = (newValue) => {
    const newId = edit.id;
    const iterate = (obj) => {
      Object.keys(obj).map((key) => {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          obj[key].id === newId &&
            setTree([...tree], (obj[key].label = newValue.label));
          iterate(obj[key]);
          if (obj[key].length === 0) return null;
        }
      });
    };
    iterate(tree);
  };
  return (
    <Fragment>
      {isAddSubmenuDialogOpen ? (
        <FormDialog
          shouldOpen={isAddSubmenuDialogOpen}
          closeDialog={() => setIsAddSubmenuDialogOpen(false)}
          onAddSubmenuSubmit={(newSubmenu) => onAddSubmenuSubmit(newSubmenu)}
          dialogTitle="Add Submenu"
          isEdit={false}
        />
      ) : null}
      {isEditSubmenuDialogOpen ? (
        <FormDialog
          shouldOpen={isEditSubmenuDialogOpen}
          closeDialog={() => setIsEditSubmenuDialogOpen(false)}
          onEditSubmenuSubmit={(newSubmenu) => onEditSubmenuSubmit(newSubmenu)}
          dialogTitle="Rename"
          isEdit={true}
        />
      ) : null}
      <TreeList tree={tree} />
      <RightClickMenu
        deleteItem={handleDeleteItem}
        renameItem={handleRenameItem}
        loadTreeFromDb={handleLoadTreeFromDb}
        saveTree={handleSaveTree}
        addSubmenu={handleAddSubmenu}
      />
    </Fragment>
  );
};

export default Tree;
