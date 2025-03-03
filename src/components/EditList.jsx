import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useLists } from '../contexts/ListsContext';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Loader from './Loader';
import Toast from './Toast';

const EditList = () => {
  const { userId, listId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState({
    name: '',
    responseCodes: [],
    imageLinks: [],
  });
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const { getLists } = useLists();

  useEffect(() => {
    const fetchList = async () => {
      const listRef = doc(db, 'users', userId, 'lists', listId);
      const listSnap = await getDoc(listRef);
      if (listSnap.exists()) {
        setListData(listSnap.data());        
        setIsLoading(false)
      } else {
        setIsLoading(false)
        console.error('List not found');
      }
    };
    setIsLoading(true);
    setTimeout(()=> fetchList(), 1000);
  }, [userId, listId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const listRef = doc(db, 'users', userId, 'lists', listId);
    await updateDoc(listRef, listData);
    await getLists();
    setMessage("List updated successfully");
    setShowToast(true);
    setTimeout(()=> navigate('/lists'), 1000);
  };

  const handleDelete = (code) => {
    setListData((prevData) => ({
      ...prevData,
      responseCodes: listData.responseCodes.filter(item => item !== code),
      images: listData.images.filter(item => !item.includes(code))
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="editList-container">
      {showToast && <Toast message={message} toggleToast={setShowToast}/>}
      {isLoading && <Loader />}
      <div className="editList-form">
        <label>
        List Name:
        </label>
        <input
          type="text"
          name="name"
          value={listData.name}
          onChange={handleChange}
        />
        <button type="submit" className="iconBtn"><SaveIcon /></button>
      </div>
      <div className="editList-imageContainer">
        {listData.responseCodes.map((code, index) => {
        return (
          <div className="editList-card">
            <img key={index} src={`https://http.dog/${code}.jpg`} alt={`HTTP ${code}`} />
            <button className='deleteBtn' onClick={() => handleDelete(code)}><DeleteIcon /></button>
          </div>
        )
        })}
      </div>
    </form>
  );
};

export default EditList;
