import { createContext, useContext, useState, useEffect } from "react";
import { fetchLists, addList, updateList, deleteList } from "../utils/firestoreUtils";
import { useAuth } from "./AuthContext";

const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const { currentUser } = useAuth();

  const getLists = async () => {
    const fetchedLists = await fetchLists(currentUser.uid);
    console.log("List data", fetchedLists);
    setLists(fetchedLists);
  };

  useEffect(() => {
    if(currentUser) {  
      getLists();
    }
  }, [currentUser]);

  const addNewList = async (listData, userId) => {
    await addList(listData, userId);
    setLists([...lists, listData]);
  };

  const editList = async (listId, newData) => {
    await updateList(listId, newData);
    setLists(lists.map((list) => (list.id === listId ? { ...list, ...newData } : list)));
  };

  const removeList = async (listId, userId) => {
    await deleteList(listId, userId);
    setLists(lists.filter((list) => list.id !== listId));
  };

  return (
    <ListsContext.Provider value={{ lists, addNewList, editList, removeList, getLists, setLists }}>
      {children}
    </ListsContext.Provider>
  );
};

export const useLists = () => useContext(ListsContext);
