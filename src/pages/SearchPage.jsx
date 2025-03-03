import React, { useState } from "react";
import FilterForm from "../components/FilterForm";
import ResponseCodeImage from "../components/ResponseCodeImage";
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from "../contexts/AuthContext";
import { useLists } from "../contexts/ListsContext";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

const SearchPage = () => {
  const [filteredCodes, setFilteredCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [listName, setListName] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const {addNewList, getLists} = useLists();
  const regex = /^[1-5][0-9x]{0,2}$/;
  const statusCodes = [
    "100",
    "101",
    "102",
    "103",
    "200",
    "201",
    "202",
    "203",
    "204",
    "205",
    "206",
    "207",
    "208",
    "218",
    "226",
    "300",
    "301",
    "302",
    "303",
    "304",
    "305",
    "306",
    "307",
    "308",
    "400",
    "401",
    "402",
    "403",
    "404",
    "405",
    "406",
    "407",
    "408",
    "409",
    "410",
    "411",
    "412",
    "413",
    "414",
    "415",
    "416",
    "417",
    "418",
    "419",
    "420",
    "421",
    "422",
    "423",
    "424",
    "425",
    "426",
    "428",
    "429",
    "430",
    "431",
    "440",
    "444",
    "449",
    "450",
    "451",
    "460",
    "463",
    "464",
    "494",
    "495",
    "496",
    "497",
    "498",
    "499",
    "500",
    "501",
    "502",
    "503",
    "504",
    "505",
    "506",
    "507",
    "508",
    "509",
    "510",
    "511",
    "520",
    "521",
    "522",
    "523",
    "524",
    "525",
    "526",
    "527",
    "529",
    "530",
    "561",
    "598",
    "599",
    "110",
    "111",
    "112",
    "113",
    "199",
    "214",
    "299",
    "999"
  ]

  const handleFilter = (filter) => {
    setIsLoading(true);
    try {
      let codes = [];
      if(filter.length > 0 && regex.test(filter)) {
        if (filter.includes("x")) {
        const codeFilter = filter.replaceAll('x','');
        codes = statusCodes.filter(code => code.startsWith(codeFilter));
        setFilteredCodes(codes);
        } 
        else if (filter.length > 0 && statusCodes.includes(filter)) {
          codes = [filter];
          setFilteredCodes(codes);
        }
        else{
          setError("Invalid response code");  
        }
    }
    else {
      setError("Please provide valid input");
    }
    setIsLoading(false);
    } 
    catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const saveList = async () => {
    setIsLoading(true);
    if (!listName) {
      setError("List name cannot be empty");
      setIsLoading(false);
      return;    
    }
    else if (filteredCodes.length === 0) {
      setError("No response codes to save")
      setIsLoading(false);
      return;
    }
    const listData = {
      name: listName,
      createdAt: new Date().toISOString(),
      responseCodes: filteredCodes,
      images: filteredCodes.map((code) => `https://http.dog/${code}.jpg`),
    }
    try {
      await addNewList(listData, currentUser.uid);
      setIsLoading(false);
      setMessage("List Saved successfully");
      setShowToast(true);      
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };

  return (
    <div className="searchPage-container">
      {showToast && <Toast message={message} toggleToast={setShowToast}/>}
      {isLoading && <Loader />}
      <h2 className="subtitle">Search Response Codes</h2>
      <FilterForm onFilter={handleFilter} setError={setError}/>
      {error && <p className="error">{error}</p>}
      {filteredCodes && filteredCodes.length > 0 &&
      <>
        <div className="filter-form">
          <input type="text" placeholder="Enter list name to save" value={listName} onChange={(e) => {
            setListName(e.target.value);
            setError("");
          }} />
          <button className="iconBtn" onClick={saveList}><SaveIcon /></button>
        </div>
        <div className="searchResult-container">
          {filteredCodes.map((code) => (
            <ResponseCodeImage key={code} code={code} />
          ))}
        </div>
      </>
      }
    </div>
  );
};

export default SearchPage;