import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import qs from "query-string";
import { Button, Icon, Notification } from "../../components/common";
import { bankr } from "../../utils/Axios";
import { useHistory } from "react-router";
import _ from "lodash";
import { errorHandler, getToken } from "../../utils/helper";
import "./Wallet.scss";
import BalanceCard from "./BalanceCard";
import { actionSetUserWallet } from "../../redux/actions/userAction";
import notFound from "../../assets/notFound.svg";
import PaymentCard from "react-payment-card-component";

export function numberWithCommas(n, separator = ",") {
  let num = n + "";

  // Test for and get any decimals (the later operations won't support them)
  let decimals = "";
  if (/\./.test(num)) {
    // This regex grabs the decimal point as well as the decimal numbers
    decimals = num.replace(/^.*(\..*)$/, "$1");
  }

  // Remove decimals from the number string
  num = num
    .replace(decimals, "")
    // Reverse the number string through Array functions
    .split("")
    .reverse()
    .join("")
    // Split into groups of 1-3 characters (with optional supported character "-" for negative numbers)
    .match(/[0-9]{1,3}-?/g)
    // Add in the mille separator character and reverse back
    .join(separator)
    .split("")
    .reverse()
    .join("");

  // Put the decimals back and output the formatted number
  return `${num}${decimals}`;
}

const Wallet = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const addCard = (e) => {
    e.preventDefault();
    setLoading(true);
    bankr
      .post("transaction/initialize", {
        email: props.user.username,
        amount: "5000",
        callbackUrl: window.location.href,
        token: getToken(),
      })
      .then((res) => {
        setLoading(true);
        window.location.href = res.data.data.authorization_url;
      })
      .catch((err) => {
        setLoading(false);
        Notification.bubble({ type: "error", content: errorHandler(err) });
      });
  };

  const createWallet = (e) => {
    e.preventDefault();
    setLoading(true);
    bankr
      .post("transaction/wallet/create", {
        token: getToken(),
      })
      .then((res) => {
        setLoading(false);
        Notification.bubble({
          type: "success",
          content: "Wallet created successfully",
        });
        window.location.reload();
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
        .post("/transaction/verify", { reference: query.reference.toString() })
        .then((res) => {
          history.replace(history.location.pathname);
          setCards((cards) => [...cards, res.data.verifyTransaction]);
          Notification.bubble({
            type: "success",
            content: "Card added to wallet successfully",
          });
        })
        .catch((err) => {
          Notification.bubble({
            type: "error",
            content: "Transaction verification failed",
          });
        });
    };

    checkPathAndVerify();
  }, [history]);

  const getCards = () => {
    bankr
      .get("/transaction/wallet/cards")
      .then((res) => {
        setCards(res.data.cards);
      })
      .catch((err) =>
        Notification.bubble({ type: "error", content: errorHandler(err) })
      );
  };

  useEffect(() => {
    const getWallet = () => {
      bankr
        .get("/transaction/wallet")
        .then((res) => {
          props.actionSetUserWallet({ ...res.data.customer });
          getCards();
        })
        .catch((err) =>
          Notification.bubble({ type: "error", content: errorHandler(err) })
        );
    };
    getWallet();
  }, []);

  return (
    <div className="wallet">
      <div className="dflex justify-between align-center heading">
        <h1>Wallet</h1>
        <div className="dflex align-center header-right">
          <Icon name="ic_notifications_none" type="md" size={24} />
          <div className="dflex align-center updates">
            <Icon name="gift" type="icomoon" size={18} />
            <span>2 NEW UPDATES</span>
          </div>
          <Icon name="userO" type="fa" size={22} />
        </div>
      </div>
      <div className="dflex">
        <div className="main">
          {_.isEmpty(props.wallet) ? (
            <>
              <div className="dflex flex-column align-center justify-center no-wallet">
                <img
                  src={notFound}
                  alt="no wallet found"
                  className="not-found"
                />
                <Button
                  onClick={createWallet}
                  loading={loading}
                  disabled={loading}
                >
                  Create Wallet
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="grid-2 balance">
                <BalanceCard
                  title="Balance"
                  amount={numberWithCommas(props.wallet.wallet_balance)}
                  color="#f1e0fc"
                  iconColor="purple"
                />
                <BalanceCard
                  title="Payable"
                  amount={numberWithCommas(props.wallet.payable)}
                  color="#dff7e7"
                  iconColor="#62D98A"
                />
                <BalanceCard
                  title="Income"
                  amount={numberWithCommas(props.wallet.wallet_balance)}
                  iconColor="#D9BF57"
                  color="#f7f2dd"
                />
                <BalanceCard
                  title="Expenses"
                  amount={numberWithCommas(props.wallet.wallet_balance)}
                  iconColor="#D94F4C"
                  color="#f9e4e4"
                />
              </div>
              <br />
              <div className="dflex align-center justify-between">
                <h3>Cards</h3>
                <Button onClick={addCard} loading={loading} disabled={loading}>
                  Add a card
                </Button>
              </div>
              <div className="card-container grid grid-3">
                {_.size(cards) > 0 ? (
                  cards.map((card, index) => (
                    <PaymentCard
                      bank={card.bank}
                      model="personnalite"
                      type="black"
                      brand={card.card_type.trim()}
                      number={`**** **** **** ${card.last4}`}
                      cvv="202"
                      holderName="Onuchukwu Adebayo"
                      expiration={`${card.exp_month}/${card.exp_year}`}
                      flipped={false}
                      key={index}
                    />
                  ))
                ) : (
                  <>No card</>
                )}
              </div>
              <br />
            </>
          )}
        </div>
        <div className="dflex side"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps, { actionSetUserWallet })(Wallet);
