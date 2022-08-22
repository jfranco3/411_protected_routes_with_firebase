import { httpsCallable } from "firebase/functions";
import { functions } from "./../firebase-config";

export const createRole = async (userCredential, userRole) => {
  // `httpsCallable()` takes in our functions config and the name
  //   of the function in our `functions/index.js` we want to call.
  //    It then returns a function for us to use.
  const addAdminRole = httpsCallable(functions, "addAdminRole");
  const email = userCredential?.user.email;
  const uid = userCredential?.user.uid;
  const role = userRole;
  // Our Serverless cloud function we made expects an object
  //   with the user `id` the users email and the role they will be assigned
  const result = await addAdminRole({ uid, email, role });
  console.log("RESULT", result);
};
