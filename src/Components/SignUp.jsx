import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthProvider";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const { signUp } = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      let response = await signUp(email, password);
      let user = response.user.uid;
    } catch (err) {
      setMessage(err.message);
    }
  };
  const handleFileChoose = (e) => {
    let fileObj = e.target.files[0];
    setProfilePicture(fileObj);
  };

  return (
    <>
      <h1>SignUp</h1>
      <div>
        <div>
          UserName:{" "}
          <input
            placeholder="Username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>
        </div>
        <div>
          Email:{" "}
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div>
          Password:{" "}
          <input
            placeholder="Email"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div>
          ProfilePicture:{" "}
          <input
            type="file"
            onChange={(e) => {
              handleFileChoose(e);
            }}
          ></input>
        </div>
        <div>
          <button onClick={handleSignup}>Signup</button>
        </div>
        <div>
          <h2 style={{ color: "red" }}>{message}</h2>{" "}
        </div>
      </div>
    </>
  );
};

export default SignUp;
