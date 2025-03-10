import '../App.css'
import { useEffect, useState } from "react";
import { useLists } from "../contexts/ListsContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

const ListsPage = () => {
  const { lists, removeList } = useLists();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {    
    setIsLoading(true);    
    if (lists.length > 0) {
      setSelectedList(lists[0]); // Select the first list by default
    }
    setIsLoading(false);
    () => setSelectedList(null);
  }, [lists]);

  const handleDelete = async (id) => {
    setIsLoading(true);
    await removeList(id, currentUser.uid);
    setSelectedList(null);
    setIsLoading(false)
    setShowToast(true);
    setMessage("List deleted successfully");
  };

  return (
    <div className="userList-container">
      {isLoading && <Loader />}
      {showToast && <Toast message={message} toggleToast={setShowToast}/>}
      <h2 className="subtitle">Saved Response Code Lists</h2>
      <div className="userList-flex">
        <div className="lists-form">
          <h3>Lists</h3>
          {lists.length === 0 ? (
            <p>No saved lists.</p>
          ) : (
            lists.map((list) => (
              <div key={list.id} className="list-item " onClick={() => setSelectedList(list)}>
                <a>{list.name}</a>
                <div className='list-item-options'>
                  <button className="iconBtn" onClick={() => handleDelete(list.id)}><DeleteIcon /></button>
                  <button className="iconBtn" onClick={() => navigate(`/edit-list/${currentUser.uid}/${list.id}`)
                    }><EditIcon /></button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="list-details">
          {selectedList ? (
            <div className="selectedList-details">
              <h3>Name: {selectedList.name}</h3>
              <p><strong>Created on:</strong> {new Date(selectedList.createdAt).toLocaleDateString()}</p>
              <h4>Response Codes:</h4>
              <div className="images">
                {selectedList.responseCodes.map((code) => (
                  <div key={code} className="response-item">
                    <img src={`https://http.dog/${code}.jpg`} alt={`HTTP ${code}`} />
                    <p>{code}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Select a list to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListsPage;
