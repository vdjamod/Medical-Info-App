// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Home() {
//   const [allMedicine, setAllMedicine] = useState([]);
//   const navigate = useNavigate();
//   let isToken = localStorage.getItem("token");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     async function getData() {
//       try {
//         const res = await axios.get("/API/index");

//         setAllMedicine(res.data);
//       } catch (error) {
//         console.error("Error fetching medicines:", error);
//       }
//     }

//     getData();
//   }, []);

//   const createMedicine = () => {
//     navigate("/admin/create");
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/API/admin/${id}`);
//       setAllMedicine((prevAllMedicine) =>
//         prevAllMedicine.filter((medicine) => medicine._id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting medicine:", error);
//     }
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     navigate("/signin");
//   };

//   const handleUpdate = (id) => {
//     navigate(`/admin/update/${id}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-md p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-blue-600">Medical Info App</h1>

//         <div className="flex gap-4">
//           {isToken ? (
//             <a
//               href="#"
//               className="text-sm font-semibold text-blue-600 hover:text-blue-800"
//               onClick={handleSignOut}
//             >
//               Sign Out <span aria-hidden="true">&rarr;</span>
//             </a>
//           ) : (
//             <a
//               href="#"
//               className="text-sm font-semibold text-blue-600 hover:text-blue-800"
//               onClick={handleSignOut}
//             >
//               Sign in <span aria-hidden="true">&rarr;</span>
//             </a>
//           )}
//         </div>
//       </header>
//       <input
//         type="text"
//         placeholder="Search medicine..."
//         className="mb-6 p-2 border border-gray-300 rounded w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
//       />

//       {/* Main Content */}
//       <main className="p-6">
//         {/* Medicine List */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {allMedicine
//             .filter((medicine) =>
//               medicine.name.toLowerCase().includes(searchTerm)
//             )
//             .map((medicine) => (
//               <div
//                 key={medicine._id}
//                 className="bg-white p-4 rounded shadow border border-gray-200"
//               >
//                 <h3 className="mb-2 text-lg font-semibold">
//                   {medicine.name}
//                   {/* <a href="#" className="text-blue-500 hover:underline">
//                   order
//                 </a> */}
//                 </h3>

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
//               </div>
//             ))}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./store/authSlice";
import { saveData } from "./store/dataSlice";
import axios from "axios";
import { unmarkRefresh } from "./store/dataSlice";

function Home() {
  const [allMedicine, setAllMedicine] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const medicineData =  useSelector((state) => state.medicineData.data);
  const refresh = useSelector((state) => state.medicineData.refresh);
  const dispatch = useDispatch();
  const isToken = localStorage.getItem("token");

  // useEffect(() => {
  //   console.log("Updated medicineData:", medicineData);
  // }, [medicineData]);

  async function demo() {
    
  }

  useEffect(() => {
    async function getData() {
      try {
        if (medicineData.length == 0 || refresh) {
          const res = await axios.get("/API/index");
          dispatch(saveData(res.data));
          dispatch(unmarkRefresh());
          setAllMedicine(res.data);
        } else {
          console.log(medicineData);
          // setAllMedicine(medicineData);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    }

    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/API/admin/${id}`);
      setAllMedicine((prev) => prev.filter((medicine) => medicine._id !== id));
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(signout());
    alert("Sign out successfully");
    navigate("/");
  };

  const handleUpdate = (id) => {
    navigate(`/admin/update/${id}`);
  };

  const createMedicine = () => {
    navigate("/admin/create");
  };

  const orderMedicine = () => {
    navigate("/medicine/order");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Medical Info App</h1>
        <div className="flex items-center gap-4">
          {isToken ? (
            <div className="flex gap-4">
              <button
                onClick={orderMedicine}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                Order Medicine
              </button>
              <button
                onClick={handleSignOut}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                Sign Out &rarr;
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/signin")}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                Sign In &rarr;
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Search */}
      <div className="p-6">
        <input
          type="text"
          placeholder="Search medicine..."
          className="mb-6 p-3 border border-gray-300 rounded w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />

        {/* Create Button */}
        {/* {isToken && (
          <button
            onClick={createMedicine}
            className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Medicine
          </button>
        )} */}

        {/* Medicine Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMedicine
            .filter((medicine) =>
              medicine.name.toLowerCase().startsWith(searchTerm)
            )
            .map((medicine) => (
              <div
                key={medicine._id}
                className="bg-white p-4 rounded shadow hover:shadow-lg transition border"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {medicine.name}
                </h3>

                <div className="mb-2">
                  <p className="font-semibold text-gray-700">Uses:</p>
                  {medicine.uses.map((use) => (
                    <div key={use} className="ml-4 text-gray-600">
                      - {use}
                    </div>
                  ))}
                </div>

                <div className="mb-2">
                  <p className="font-semibold text-gray-700">Side Effects:</p>
                  {medicine.sideEffects.map((sideEffect) => (
                    <div key={sideEffect} className="ml-4 text-gray-600">
                      - {sideEffect}
                    </div>
                  ))}
                </div>

                <div className="mb-2">
                  <p className="font-semibold text-gray-700">Ingredients:</p>
                  {medicine.ingredients.map((ingredient) => (
                    <div
                      key={ingredient._id}
                      className="ml-4 text-gray-600 border-l-4 border-blue-200 pl-3"
                    >
                      <p>Name: {ingredient.name}</p>
                      <p>Description: {ingredient.description}</p>
                      <p>Quantity: {ingredient.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* {isToken && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleUpdate(medicine._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(medicine._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )} */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
