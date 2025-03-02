import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useLists } from '../contexts/ListsContext';
import DeleteIcon from '@mui/icons-material/Delete';

const EditList = () => {
  const { userId, listId } = useParams();
  const navigate = useNavigate();
  const [listData, setListData] = useState({
    name: '',
    responseCodes: [],
    imageLinks: [],
  });
  const { getLists } = useLists();

  useEffect(() => {
    const fetchList = async () => {
      const listRef = doc(db, 'users', userId, 'lists', listId);
      const listSnap = await getDoc(listRef);
      if (listSnap.exists()) {
        setListData(listSnap.data());        
      } else {
        console.error('List not found');
      }
    };
    fetchList();
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
    navigate('/lists');
  };

  const handleDelete = (code) => {
    setListData((prevData) => ({
      ...prevData,
      responseCodes: listData.responseCodes.filter(item => item !== code),
      images: listData.images.filter(item => !item.includes(code))
    }));
  }

  console.log("listData", listData);
  return (
    <form onSubmit={handleSubmit} className="editList-container">
      <label>
        List Name:
        <input
          type="text"
          name="name"
          value={listData.name}
          onChange={handleChange}
        />
        <div className="editList-imageContainer">
          {listData.responseCodes.map((code, index) => {
          return (
            <div className="editList-card">
              <img key={index} src={`https://http.dog/${code}.jpg`} alt={`HTTP ${code}`} />
              <button onClick={() => handleDelete(code)}><DeleteIcon /></button>
            </div>
          )
          })}
        </div>
      </label>
      {/* Add inputs for responseCodes and imageLinks as needed */}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditList;
