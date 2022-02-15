import React, { Fragment, useEffect, useState } from "react";
import TreeList from "./TreeList";
import axios from "axios";
import "./Tree.css";
import { data } from "../data";
import FormDialog from "./FormDialog";

const URL =
  "https://nested-menu-1cecc-default-rtdb.europe-west1.firebasedatabase.app/menu.json";
const Tree = () => {
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [tree, setTree] = useState([]);
  const [isAddSubmenuDialogOpen, setIsAddSubmenuDialogOpen] = useState(false);
  const handleMenuSelection = (id, depth, branches) => {
    setSelectedMenus((prevSelectedMenus) => {
      const newSelectedMenus = [...prevSelectedMenus];
      // trim any menus after the depth
      newSelectedMenus.length = depth;
      if (id !== "") {
        newSelectedMenus[depth] = id;
      }
      // close when clicking on the same menu
      if (selectedMenus[depth] === id) {
        newSelectedMenus.length = depth;
      }
      return newSelectedMenus;
    });
  };
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
  const handleDeleteItem = (e, id, depth) => {
    depth !== undefined && e.stopPropagation();
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
  const handleRenameItem = (e, id, depth) => {
    e.stopPropagation();
    const findItemNested = (arr, itemId, nestingKey) => {
      const myReducer = arr.reduce((a, item) => {
        if (a) return a;
        if (item.id === itemId) return item;
        if (item[nestingKey])
          return findItemNested(item[nestingKey], itemId, nestingKey);
      }, null);
      return myReducer;
    };
    const res = findItemNested(data, id, "branches");
    console.log(res);
  };
  const handleAddSubmenu = (e, id, depth) => {
    depth !== undefined && e.stopPropagation();
    console.log(id);
    setIsAddSubmenuDialogOpen((prev) => !prev);
  };
  const handleSaveTree = async () => {
    const response = await axios.put(URL, data);
    return response;
  };
  const handleLoadTreeFromDb = async () => {
    const result = await fetchDataFromDb();
    if (result) setTree(result.data);
  };
  const closeDialoge = () => {
    setIsAddSubmenuDialogOpen(false);
  };
  const addSubmenu = (newSubmenu) => {
    console.log(newSubmenu, tree);
  };

  return (
    <Fragment>
      {isAddSubmenuDialogOpen ? (
        <FormDialog
          shouldOpen={isAddSubmenuDialogOpen}
          closeDialog={() => closeDialoge()}
          addSubmenu={(sub) => addSubmenu(sub)}
          dialogTitle="Add Submenu"
        />
      ) : null}
      <ul>
        {tree.map((item) => {
          return (
            <TreeList
              tree={item}
              handleMenuSelection={handleMenuSelection}
              key={item.id}
              selectedMenus={selectedMenus}
              deleteItem={handleDeleteItem}
              renameItem={handleRenameItem}
              saveTree={handleSaveTree}
              loadTreeFromDb={handleLoadTreeFromDb}
              addSubmenu={handleAddSubmenu}
            />
          );
        })}
      </ul>
    </Fragment>
  );
};

export default Tree;
