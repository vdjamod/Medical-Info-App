import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Signin from "./components/admin/Signin";
import AdminHome from "./components/admin/AdminHome";
import AddMedicine from "./components/pages/AddMedicine";
import UpdateMedicine from "./components/pages/UpdateMedicine";
import OrderMedicine from "./components/user/OrderMedicine";
import Singup from "./components/user/Singup";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPass from "./components/pages/ResetPass";
import AuthLayout from "./components/pages/AuthLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/create" element={<AddMedicine />} />
          <Route path="/admin/update/:id" element={<UpdateMedicine />} />
          <Route
            path="/medicine/order"
            element={
              <AuthLayout>
                <OrderMedicine />
              </AuthLayout>
            }
          />
          <Route path="/reset-password/:id" element={<ResetPass />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
