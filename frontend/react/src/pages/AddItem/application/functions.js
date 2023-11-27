import { toast } from "react-toastify";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import storage from "../../../main";

//import 'firebase/firestore';
import {getStorage} from "firebase/storage";

/**
 *  Uploads a file to Firebase Storage
 * @param {string} file
 * @returns {Promise<string>} url
 */
async function handleUpload(file,app) {
  console.log("consloleapp",app);
  if (!file) {
    throw new Error("Please choose a file first!");
  }

  /*const storageRef = ref(storage, `/files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef,file);*/

  console.log("before storageref");
  const storage = await getStorage();
  console.log("STORAGE: ", storage);
  const storageRef = ref(storage, `/files/${file.name}`);//.ref(`/files/${file.name}`);
  console.log("before uploadtask", storageRef, file);
  const uploadTask = uploadBytesResumable(storageRef, file);

  try {
    // Wait for the upload task to complete
    await new Promise((resolve, reject) => {
      console.log("inpromise",resolve,reject);
      uploadTask.on("state_changed", null, reject, () => resolve());
    });

    console.log("after promise");
    // Get the download URL
    const url = await getDownloadURL(uploadTask.snapshot.ref);
    console.log("url", url);
    return url;
  } catch (error) {
    console.error(error);
    throw new Error("Error during image upload: " + error);
  }
}

/**
 * Saves data to backend
 * @param {Object} data
 * @param {string} data.listedBy - The ID of the user who listed the item.
 * @param {string} data.name - The name of the item.
 * @param {string} data.description - The description of the item.
 * @param {string} data.price - The price of the item.
 * @param {string} data.file - The file of the item.
 
 * @returns {Promise<boolean>} true if successful, false otherwise
 */

export async function addItem(data,app) {
  const { listedBy, name, description, price, file } = data;

  try {
    console.log("dfdf",data);
    const img = await handleUpload(file,app);
    // const img = "";
    console.log("hahaaaa",img);

    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/list/addItem",
      {
        listedBy: listedBy,
        name: name,
        description: description,
        images: [img],
        price: price,
        comments: [],
      }
    ).then(function(response) {
      console.log("response", response);
    }).then(function(error) {
      console.log("error");
    });
  } catch (err) {
    console.log(err);
    toast.error("Error uploading image");
    return false;
  }
}
