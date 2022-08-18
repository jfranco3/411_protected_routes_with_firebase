import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import SelectUserRole from "./SelectUserRole";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase-config";


const SignUp = (props) => {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // Class 10:
  const [userRole, setUserRole] = useState(null);

  const createRole = async (userCredential, userRole) => {
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
    console.log("result", result);
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      createRole(userCredential, userRole);
      console.log(
        "userCrendential.user:from SingUP.js",
        userCredential.user.uid
      );
      //   console.log("userCredential.user:from SignUP.js", userCredential.user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Class 10:
  // const handleSelectUserRole = (role) => {
  //   setUserRole(role);
  // };

  return (
    <div className="App">
      <Container maxWidth="sm">
        <form className="login-form" onSubmit={signUp}>
          <SelectUserRole setUserRole={setUserRole} />
          <TextField
            required
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
            value={registerEmail}
            name="Email"
            label="Email"
            type="text"
          />
          <TextField
            required
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
            value={registerPassword}
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            className="login-button"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
      </Container>
    </div>
  );
};
export default SignUp;
