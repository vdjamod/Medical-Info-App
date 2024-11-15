import axios from "axios";
import { useState } from "react";

export default function AddMedicine() {
  const today = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");

  const [uses, setUses] = useState([]);
  const [newUse, setNewUse] = useState("");

  const [sideEffect, setSideEffect] = useState([]);
  const [newSideEffect, setNewSideEffect] = useState("");

  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientDescription, setIngredientDescription] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");

  const addNewSideEffect = () => {
    if (newSideEffect.trim()) {
      // Prevents empty entries
      setSideEffect((prevSideEffects) => [
        ...prevSideEffects,
        newSideEffect.trim(),
      ]);
      setNewSideEffect("");
    }

    console.log(sideEffect);
  };

  const deleteUse = (idx) => {
    setUses((prevUses) => uses.filter((prevUses) => prevUses.idx != idx));
  }

  const addNewUse = () => {
    if (newUse.trim()) {
      setUses((prevUses) => [...prevUses, newUse.trim()]);
      setNewUse("");
    }

    console.log(uses);
  };

  const addNewIngredient = () => {

  }

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const res = await axios.post("/API/admin", {
    //     name,
    //     uses,
    //     side_effects: sideEffects,
    //     ingredients,
    //   });
    // } catch (err) {
    //   console.log("Unable to add Medicine" + err);
    // }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Medicine
          </h2>
        </div>

        {/* Name */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onClick={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <textarea
                  id="name"
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Uses  */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="uses"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Uses
                </label>
              </div>
              <div className="mt-2 flex space-x-4">
                <input
                  id="uses"
                  name="uses"
                  type="text"
                  value={newUse}
                  onChange={(e) => setNewUse(e.target.value)}
                  required
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={addNewUse}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                <ul>
                  {uses.map((use, idx) => (
                    <li key={idx}>
                      {use}
                      <button
                        className="ml-4 text-indigo-600 hover:text-indigo-800"
                        onClick={() => deleteUse(idx)}
                      >
                        delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Side Effects  */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="side_effect"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Side Effects
                </label>
              </div>
              <div className="mt-2 flex space-x-4">
                <input
                  id="side_effect"
                  name="side_effect"
                  type="text"
                  value={newSideEffect}
                  onChange={(e) => setNewSideEffect(e.target.value)}
                  required
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={addNewSideEffect}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                <ul>
                  {sideEffect.map((sideEffect, idx) => (
                    <li key={idx}>{sideEffect}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="ingredient"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ingredients
                </label>
              </div>
              <div className="mt-2 flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="ingredient-name"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    id="ingredient-name"
                    name="ingredient-name"
                    onChange={(e) => setIngredientName(e.target.value)}
                    type="text"
                    required
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="ingredient-description"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <input
                    id="ingredient-description"
                    name="ingredient-description"
                    onChange={(e) => setIngredientDescription(e.target.value)}
                    type="text"
                    required
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="ingredient-quantity"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </label>
                  <input
                    id="ingredient-quantity"
                    name="ingredient-quantity"
                    onChange={(e) => setIngredientQuantity(e.target.value)}
                    type="text"
                    required
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="mt-5 flex-1">
                  <button
                    type="button"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
