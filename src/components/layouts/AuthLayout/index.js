import React, { useEffect, useState } from "react";
import { Notification, Spinner } from "../../common";
import { getToken, primaryColor, USER_TOKEN } from "../../../utils/helper";
import { connect } from "react-redux";
import { actionSetUser } from "../../../redux/actions/userAction";
import { bankr } from "../../../utils/Axios";
import { useHistory } from "react-router";

function AuthLayout({ children, actionSetUser }) {
  const history = useHistory();
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    const verifyUser = (token) => {
      bankr
        .post("/user/me", { token })
        .then((res) => {
          actionSetUser(res.data.user);
          setCanAccess(true);
        })
        .catch((err) => {
          localStorage.removeItem(USER_TOKEN);
          history.push("/login");
          Notification.bubble({
            type: "error",
            content: "You are not logged in",
          });
        });
    };

    verifyUser(getToken());
  }, [actionSetUser, history]);

  if (!canAccess)
    return (
      <center>
        <Spinner color={primaryColor} />
      </center>
    );

  return <>{children}</>;
}

export default connect(() => ({}), { actionSetUser })(AuthLayout);
