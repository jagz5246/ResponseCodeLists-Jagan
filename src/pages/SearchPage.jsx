import React, { useState } from "react";
import FilterForm from "../components/FilterForm";
import ResponseCodeImage from "../components/ResponseCodeImage";
import { addList } from "../utils/firestoreUtils";
import { useAuth } from "../contexts/AuthContext";
import { useLists } from "../contexts/ListsContext";

const SearchPage = () => {
  const [filteredCodes, setFilteredCodes] = useState([]);
  const [listName, setListName] = useState("");
  const { currentUser } = useAuth();
  const {addNewList} = useLists();

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
    let codes = [];
    if (filter.includes("x")) {
      const codeFilter = filter.replaceAll('x','');
      codes = statusCodes.filter(code => code.startsWith(codeFilter));
    } else {
      codes = [filter];
    }
    setFilteredCodes(codes);
  };

  const saveList = async () => {
    if (!listName || filteredCodes.length === 0) return;    
    const listData = {
      name: listName,
      createdAt: new Date().toISOString(),
      responseCodes: filteredCodes,
      images: filteredCodes.map((code) => `https://http.dog/${code}.jpg`),
    }
    try {
      await addNewList(listData, currentUser.uid);
      alert("List saved!");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h1>Search Response Codes</h1>
      <FilterForm onFilter={handleFilter} />
      <input type="text" placeholder="List Name" value={listName} onChange={(e) => setListName(e.target.value)} />
      <button onClick={saveList}>Save List</button>
      <div>
        {filteredCodes.map((code) => (
          <ResponseCodeImage key={code} code={code} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;