import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import { auth, db } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import SelectUserRole from "./SelectUserRole";
import { createRole } from "../utils/utilityFunctions";
import { setDoc, doc } from "firebase/firestore";

const SignUp = (props) => {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [userRole, setUserRole] = useState(null);

  const createLikedCarsCollection = async (user) => {
    await setDoc(doc(db, "userLikedCars", user.user.email), {
      userId: user.user.uid,
      likedCarsIds: [],
    });
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
      createLikedCarsCollection(userCredential);
      // console.log(
      //   "userCrendential.user:from SingUP.js",
      //   userCredential.user.uid
      // );
      console.log("userCredential.user:from SignUP.js", userCredential.user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

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
