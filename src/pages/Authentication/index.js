import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Icon, Notification } from "../../components";
import { actionSetUser } from "../../redux/actions/userAction";
import { bankr } from "../../utils/Axios";
import { errorHandler, USER_TOKEN } from "../../utils/helper";
import "./Authentication.scss";

const Authentication = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [activeState, setActiveState] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (activeState === 0) {
      bankr
        .post("/user/login", { username: email, password })
        .then((res) => {
          setLoading(false);
          localStorage.setItem(USER_TOKEN, res.data.token);
          props.actionSetUser(res.data.user);
          history.push("/");
        })
        .catch((error) => {
          Notification.bubble({ type: "error", content: errorHandler(error) });
          setLoading(false);
        });
    } else {
      bankr
        .post("/user/create", { username: email, password })
        .then((res) => {
          setLoading(false);
          localStorage.setItem(USER_TOKEN, res.data.token);
          props.actionSetUser(res.data.user);
          history.push("/");
        })
        .catch((error) => {
          Notification.bubble({ type: "error", content: errorHandler(error) });
          setLoading(false);
        });
    }
  };

  const onInputBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setErrors({ ...errors, [name]: true });
    } else {
      setErrors({ ...errors, [name]: false });
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        {activeState === 1 && (
          <div onClick={() => setActiveState(0)}>
            <Icon
              name="chevronLeft"
              type="feather"
              size="20"
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
        <h4>{activeState === 0 ? "Welcome!" : "Sign Up"}</h4>
        <span className="auth-header--details">
          {activeState === 0
            ? "Please login to proceed."
            : "Please enter your details to get started"}
        </span>
        <form onSubmit={onFormSubmit}>
          <div className="form-content">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="jack.robinson@bankr.com"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email && "invalid"}
              onBlur={(e) => onInputBlur(e)}
            />
          </div>
          <div className="form-content">
            <label>Password</label>
            <input
              type="password"
              required
              name="password"
              value={password}
              placeholder="****"
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password && "invalid"}
              onBlur={(e) => onInputBlur(e)}
            />
          </div>
          <div>
            <Button
              type="submit"
              className="login-btn"
              disabled={email === "" || password === "" || loading}
              loading={loading}
            >
              {activeState === 0 ? "Log In" : "Submit"}
            </Button>
          </div>
        </form>
        <div className="auth-footer--text">
          {activeState === 0 ? (
            <p>
              Don't have an account yet?{" "}
              <span onClick={() => setActiveState(1)}>Sign up here!</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setActiveState(0)}>Login here!</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    user: state.user,
  }),
  { actionSetUser }
)(Authentication);
