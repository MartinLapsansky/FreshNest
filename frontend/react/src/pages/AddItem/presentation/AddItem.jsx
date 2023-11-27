import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import { addItem } from "../application/functions";
import appState from "../../../data/AppState";

const AddItem = (app) => {
  var navigate = useNavigate();

  console.log("app",app);

  const [data, setData] = useState({
    name: "",
    description: "",
    file: "",
    price: "",
  });

  /**
   * Update state on input change
   * @param {React.ChangeEventHandler<HTMLInputElement>} e
   */
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Update state on image change
   * @param {React.ChangeEventHandler<HTMLInputElement>} e
   */
  const handleImageChange = (e) => {
    setData({
      ...data,
      file: e.target.files[0],
    });
  };

  /**
   * Adds item to the backend
   * @param {React.FormEventHandler<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await addItem({
      listedBy: appState.userData._id,
      name: data.name,
      description: data.description,
      price: data.price,
      file: data.file,
    },app);

    if (res) {
      navigate('/shop');
    }
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

  return (
      <main>
        <NavBar />
        <section className="flex flex-col items-center justify-center h-screen bg-green-700">
          <div className="h-1 mb-4 font-bold"
          style={{fontSize: "50px", color: "#CCFAA8"} }>Add your product here</div>
          <form onSubmit={handleSubmit} className="flex flex-col items-start p-8 bg-green-50 rounded shadow-md mt-20 w-1/2"
          style={{alignItems: "center", borderRadius: "50px"}}>
            <label htmlFor="name" style={{fontSize: "30px"}}>Product Name</label>
            <input className="input input-bordered w-full border-accent " type="text" id="name" name="name" value={data.name} onChange={handleInputChange} />
            <div className="h-4"></div>
            <label htmlFor="description" style={{fontSize: "30px"}}>Product Description</label>
            <input className="input input-bordered w-full border-accent" type="text" id="description" name="description" value={data.description} onChange={handleInputChange} />
            <div className="h-4"></div>
            <label htmlFor="price" style={{fontSize: "30px"}}>Price</label>
            <input className="input input-bordered w-full border-accent" type="number" id="price" name="price" value={data.price} onChange={handleInputChange} />
            <div className="h-4"></div>
            <label htmlFor="image" style={{fontSize: "30px"}}>Product Image</label>
            <div className="h-2"></div>
            <input type="file" id="image" name="image" onChange={handleImageChange} className="file input w-5/12 border-accent font-bold " />
            <button
                type="submit"
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-sucess mt-4 bg-green-500"
            >
              Add Item
            </button>
          </form>
        </section>
      </main>
  );

};

export default AddItem;
