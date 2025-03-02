import '../App.css'
import { useEffect, useState } from "react";
import { useLists } from "../contexts/ListsContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const ListsPage = () => {
  const { lists, removeList } = useLists();
  const [selectedList, setSelectedList] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {    
    if (lists.length > 0) {
      setSelectedList(lists[0]); // Select the first list by default
    }
    () => setSelectedList(null);
  }, [lists]);

  const handleDelete = async (id) => {
    await removeList(id, currentUser.uid);
    setSelectedList(null);
  };

  return (
    <div className="container">
      <h2>Saved Response Code Lists</h2>

      <div className="list-container">
        <div className="list-names">
          <h3>Lists</h3>
          {lists.length === 0 ? (
            <p>No saved lists.</p>
          ) : (
            lists.map((list) => (
              <div key={list.id} className="list-item">
                <button onClick={() => setSelectedList(list)}>{list.name}</button>
                <button onClick={() => handleDelete(list.id)}>🗑️</button>
                <button onClick={() => navigate(`/edit-list/${currentUser.uid}/${list.id}`)}>✏️</button>
              </div>
            ))
          )}
        </div>

        <div className="list-details">
          {selectedList ? (
            <>
              <h3>{selectedList.name}</h3>
              <p><strong>Created on:</strong> {new Date(selectedList.createdAt).toLocaleDateString()}</p>
              <h4>Response Codes:</h4>
              <div className="images">
                {selectedList.responseCodes.map((code) => (
                  <div key={code} className="response-item">
                    <p>{code}</p>
                    <img src={`https://http.dog/${code}.jpg`} alt={`HTTP ${code}`} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Select a list to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListsPage;
