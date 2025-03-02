// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import { ListsProvider } from "./contexts/ListsContext";
// import LoginSignup from "./pages/LoginSignup";
// import SearchPage from "./pages/SearchPage";
// import ListsPage from "./pages/ListsPage";

// const App = () => {
//   return (
//     <AuthProvider>
//       <ListsProvider>
//         <Router>
//           <Routes>
//             <Route path="/" element={<LoginSignup />} />
//             <Route path="/search" element={<SearchPage />} />
//             <Route path="/lists" element={<ListsPage />} />
//           </Routes>
//         </Router>
//       </ListsProvider>
//     </AuthProvider>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import ListsPage from "./pages/ListsPage";
import SearchPage from "./pages/SearchPage";
import LoginSignup from "./pages/LoginSignup";
import { AuthProvider } from "./contexts/AuthContext";
import { ListsProvider } from "./contexts/ListsContext";
import ProtectedRoute from "./components/ProtectedRoute";
import EditList from "./components/EditList";

function App() {
  return (
    <AuthProvider>
      <ListsProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<LoginSignup />}/>
            <Route element={<ProtectedRoute />}>
              <Route path="/lists" element={<ListsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/edit-list/:userId/:listId" element={<EditList />}/>
            </Route>
          </Routes>
        </Router>
      </ListsProvider>
    </AuthProvider>
  );
}

export default App;
