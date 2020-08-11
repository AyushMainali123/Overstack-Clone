import React from "react";
import "./CreateAccount.css";
import { auth } from "./firebase";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateAccount = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkPassword === password) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          history.push("/");
        })
        .catch((error) => console.log(error.message));
    } else {
      alert("Please enter same password in both fields");
    }
  };
  return (
    <form className="createAccount">
      <h3 className="createAccount__title">Create Account</h3>
      <div>

        <label className="createAccount__email">
          <div className="target">Email Address*</div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <div className="createAccount__password">
          <label className="createAccount__createPassword">
            <div className="target">Create Password*</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="createAccount__confirmPassword">
            <div className="target">Confirm Password*</div>
            <input
              type="password"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="createAccount__offers">
          <input type="checkbox" />
          <span className="createAccount__offersText">
            {" "}
            Sign up today for exclusive offers from Overstock.com delivered
            right to your inbox**
          </span>
        </div>
        <button
          type={"submit"}
          onClick={handleSubmit}
          className="createAccount__button"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default CreateAccount;
