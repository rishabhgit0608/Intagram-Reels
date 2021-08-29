import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthProvider";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      let response = await login(email, password);
      props.history.push("/");
    } catch (err) {
      setMessage(err.message);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div>
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
          <button onClick={handleSubmit}>Login</button>
        </div>
        <div>
          <h2 style={{ color: "red" }}>{message}</h2>{" "}
        </div>
      </div>
    </>
  );
};

export default Login;
