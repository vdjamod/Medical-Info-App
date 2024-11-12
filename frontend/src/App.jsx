import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./components/admin/Login";
import AdminHome from "./components/admin/AdminHome";
import AddMedicine from "./components/pages/AddMedicine";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminHome />}/>
          <Route path="/admin/create" element={<AddMedicine />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
