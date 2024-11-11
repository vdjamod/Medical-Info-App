import React from "react";
import { useNavigate } from "react-router-dom";

function AdminHome() {
    const navigate = useNavigate();
  const createMedicine = () => {
    navigate('/admin/create');
  };
  return (
    <>
      <button onClick={createMedicine}>Create Medicine</button>
    </>
  );
}

export default AdminHome;
