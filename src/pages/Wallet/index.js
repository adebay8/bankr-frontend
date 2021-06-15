import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import qs from "query-string";
import { Button, Notification } from "../../components/common";
import { bankr } from "../../utils/Axios";
import { useHistory } from "react-router";
import _ from "lodash";
import { errorHandler } from "../../utils/helper";

const Wallet = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const addCard = (e) => {
    e.preventDefault();
    setLoading(true);
    bankr
      .post("transaction/initialize", {
        email: props.user.username,
        amount: "5000",
        callbackUrl: window.location.href,
      })
      .then((res) => {
        setLoading(false);
        window.location.href = res.data.data.authorization_url;
      })
      .catch((err) => {
        setLoading(false);
        Notification.bubble({ type: "error", content: errorHandler(err) });
      });
  };

  useEffect(() => {
    const checkPathAndVerify = () => {
      const query = qs.parse(history.location.search);
      if (_.isEmpty(query)) return;
      bankr
        .post("/transaction/verify", { reference: query.reference })
        .then((res) => {
          history.replace(history.location.pathname);
          Notification.bubble({
            type: "success",
            content: "Card added to wallet successfully",
          });
        })
        .catch((err) => {
          console.log(err.response);
          Notification.bubble({
            type: "error",
            content: "Transaction verification failed",
          });
        });
    };

    checkPathAndVerify();
  }, [history]);

  return (
    <div>
      <h1>Wallet</h1>
      <Button onClick={addCard} loading={loading} disabled={loading}>
        Add a card
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Wallet);
