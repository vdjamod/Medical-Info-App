// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";

// function AdminHome() {
//   const [allMedicine, setAllMedicine] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getData() {
//       const res = await axios.get("/API/admin");
//       setAllMedicine(res.data);
//     }

//     getData();
//   }, []);

//   // useEffect(() => {
//   //   console.log("Updated allMedicine:", allMedicine); // Logs after state update
//   // }, [allMedicine]);

//   const createMedicine = () => {
//     navigate("/admin/create");
//   };

//   const handleDelete = async (id) => {
//     const res = await axios.delete(`/API/admin/${id}`);

//     // console.log(res);

//     setAllMedicine((prevAllMedicine) =>
//       prevAllMedicine.filter((medicine) => medicine._id !== id)
//     );
//   };

//   const handleUpdate = async (id) => {
//     navigate(`/admin/update/${id}`);
//   }

//   return (
//     <>
//       <div className="p-6 bg-gray-100 min-h-screen">
//         <button
//           onClick={createMedicine}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
//         >
//           Create Medicine
//         </button>

//         <h2 className="text-xl font-semibold mt-6">Medicine List</h2>
//         <hr className="my-4 border-gray-300" />

//         <div className="ml-4">
//           <ul>
//             {allMedicine.map((medicine) => (
//               <li
//                 key={medicine._id}
//                 className="bg-white p-4 rounded shadow mb-4 border border-gray-200"
//               >
//                 <div className="mb-2">
//                   <b className="font-semibold">Name:</b> {medicine.name}
//                 </div>

//                 <div className="mb-2">
//                   <b className="font-semibold">Uses:</b>
//                   {medicine.uses.map((use) => (
//                     <div key={use} className="ml-4 text-gray-700">
//                       {use}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mb-2">
//                   <b className="font-semibold">Side Effects:</b>
//                   {medicine.sideEffects.map((sideEffect) => (
//                     <div key={sideEffect} className="ml-4 text-gray-700">
//                       {sideEffect}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mb-4">
//                   <b className="font-semibold">Ingredients:</b>
//                   {medicine.ingredients.map((ingredient) => (
//                     <div
//                       key={ingredient._id}
//                       className="ml-4 text-gray-700 border-l-4 border-gray-300 pl-2"
//                     >
//                       <div>Name: {ingredient.name}</div>
//                       <div>Description: {ingredient.description}</div>
//                       <div>Quantity: {ingredient.quantity}</div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow"
//                     onClick={() => handleUpdate(medicine._id)}
//                   >
//                     Update
//                   </button>
//                   <button
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
//                     onClick={() => handleDelete(medicine._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AdminHome;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminHome() {
  const [allMedicine, setAllMedicine] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("/API/admin");
        setAllMedicine(res.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    }

    getData();
  }, []);

  const createMedicine = () => {
    navigate("/admin/create");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/API/admin/${id}`);
      setAllMedicine((prevAllMedicine) =>
        prevAllMedicine.filter((medicine) => medicine._id !== id)
      );
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/update/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
        <button
          onClick={createMedicine}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Create Medicine
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-6">Medicine List</h2>

        {/* Medicine List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMedicine.map((medicine) => (
            <div
              key={medicine._id}
              className="bg-white p-4 rounded shadow border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-2">{medicine.name}</h3>

              <div className="mb-2">
                <b className="font-semibold">Uses:</b>
                {medicine.uses.map((use) => (
                  <div key={use} className="ml-4 text-gray-700">
                    {use}
                  </div>
                ))}
              </div>

              <div className="mb-2">
                <b className="font-semibold">Side Effects:</b>
                {medicine.sideEffects.map((sideEffect) => (
                  <div key={sideEffect} className="ml-4 text-gray-700">
                    {sideEffect}
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <b className="font-semibold">Ingredients:</b>
                {medicine.ingredients.map((ingredient) => (
                  <div
                    key={ingredient._id}
                    className="ml-4 text-gray-700 border-l-4 border-gray-300 pl-2"
                  >
                    <div>Name: {ingredient.name}</div>
                    <div>Description: {ingredient.description}</div>
                    <div>Quantity: {ingredient.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow"
                  onClick={() => handleUpdate(medicine._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                  onClick={() => handleDelete(medicine._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminHome;
