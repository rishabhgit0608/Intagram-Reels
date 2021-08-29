import React, { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

const Feeds = (props) => {
  let { signout } = useContext(AuthContext);
  const handleLogout = async () => {
    await signout();
    props.history.push("/login");
  };
  return (
    <div>
      <h1>Feeds</h1>;<button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Feeds;
