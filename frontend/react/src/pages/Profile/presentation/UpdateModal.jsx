import React, { useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
// import updateUser from "../application/profile";
import axios from "axios";
import appState from "../../../data/AppState";

const UpdateModal = ({ user }) => {
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  async function updateUser(body) {
    const res = await axios.post(
        import.meta.env.VITE_API_URL + "/profile/updateUser",
        { ...body, _id: appState.userData._id }
    );

    console.log(res);
    if (res.status !== 200) {
      toast.error(
          "An error occurred while updating your profile. Please try again later."
      );
    } else {
      appState.setUserData(res.data.data);
    }
  }

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-5">Edit Details</h3>
        <div className="flex flex-col">
          <label htmlFor="input">Name</label>
          <input
            name="name"
            onChange={handleFieldChange}
            type="text"
            value={data.name}
            className="input input-bordered mt-2"
          ></input>
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="input">Email</label>
          <input
            name="email"
            onChange={handleFieldChange}
            type="email"
            value={data.email}
            className="input input-bordered mt-2"
          ></input>
        </div>
        <div className="flex flex-col mt-2 ">
          <label htmlFor="input">Phone</label>
          <input
            name="phone"
            onChange={handleFieldChange}
            value={data.phone}
            type="phone"
            className="input input-bordered mt-2"
          ></input>
        </div>

        <div className="flex flex-row mt-5 gap-3">
          <button
            className="btn btn-error"
            onClick={() => document.getElementById("my_modal_1").close()}
          >
            Close
          </button>
          <button
              name="submitFormButton"
            className="btn btn-accent text-white"
            onClick={() => {
              validateFields();
            }}
          >
            Update Details
          </button>
        </div>
      </div>
      <div className="modal-action">
        <form method="dialog"></form>
      </div>
    </dialog>
  );

  function handleFieldChange(e) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function validateFields() {
    const errors = {};
    let result = {
      isSuccess : false,
      errors: []
    };

    if (_.isEmpty(data.name)) {
      errors.name = "Name is required";
      result.isSuccess = false;
      result.errors.push("empty name");
    }
    if (_.isEmpty(data.email)) {
      errors.email = "Email is required";
      result.isSuccess = false;
      result.errors.push("empty email");

    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address";
      result.isSuccess = false;
      result.errors.push("email has not correct form");
    }

    if (_.isEmpty(data.phone)) {
      errors.phone = "Phone is required";
      result.isSuccess = false;
      result.errors.push("empty phone");
    } else if (!/^\d{10}$/.test(data.phone)) {
      errors.phone = "Invalid phone number";
      result.isSuccess = false;
      result.errors.push("phone has not correct form");
    }

    const modal = document.getElementById("my_modal_1");
    if (_.isEmpty(errors)) {
      await updateUser(data);
      modal.returnValue = 1;
      result.isSuccess = true;
    } else {
      let message = "";
      for (const key in errors) {
        message += errors[key] + "\n";
      }
      toast.error(message);
      console.log(errors);
      modal.returnValue = 0;
    }
    modal.close();
    return result;
  }

};

// Export the UpdateModal component


// Export the validateFields function separately

export default UpdateModal;

