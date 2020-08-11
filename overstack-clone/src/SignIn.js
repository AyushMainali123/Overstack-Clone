import React, { useState } from "react";
import "./SignIn.css";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => history.push("/"))
      .catch((error) => alert(error.message));
  };
  return (
    <div className="signin">
      <h3>Sign In</h3>
      <form>
        <label className="sign__email">
          <div className = "target">Email Address*</div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="signin__password">
          <div className = "target">Password*</div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type={"submit"}
          onClick={handleSubmit}
          className="signin__button"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
