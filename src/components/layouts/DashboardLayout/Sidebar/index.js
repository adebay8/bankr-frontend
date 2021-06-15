import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "../../../common";

const Sidebar = () => {
  const [seed, setSeed] = useState();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return (
    <>
      <section className="header dflex align-center justify-between">
        <h3>Bankr</h3>
        <img
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
          alt=""
        />
      </section>
      <Button style={{ width: "100%", padding: "13px" }}>Quick Invest</Button>
      <div className="nav-links">
        <div className="nav-item dflex align-center">
          <Icon
            name="search"
            type="feather"
            style={{ color: "#A0A7B7" }}
            size={22}
          />
          <Link to="#">Find a transaction</Link>
        </div>
        <div className="nav-item dflex align-center">
          <Icon name="users" type="fa" style={{ color: "#A0A7B7" }} size={22} />
          <Link to="#">Community</Link>
        </div>
        <div className="nav-item dflex align-center">
          <Icon
            name="ic_message"
            type="md"
            style={{ color: "#A0A7B7" }}
            size={22}
          />
          <Link to="#">Help & Supoort</Link>
        </div>
      </div>
      <section>
        <p className="section-title">General</p>
        <div className="nav-links">
          <div className="nav-item dflex align-center">
            <Icon name="home" type="fa" size={22} />
            <Link to="/dashboard">Home</Link>
          </div>
          <div className="nav-item dflex align-center">
            <Icon name="ic_account_balance_wallet" type="md" size={22} />
            <Link to="/dashboard/wallet">Wallet</Link>
          </div>
          <div className="nav-item dflex align-center">
            <Icon name="ic_assignment" type="md" size={22} />
            <Link to="#">Plans</Link>
          </div>
          <div className="nav-item dflex align-center">
            <Icon name="lineChart" type="fa" size={22} />
            <Link to="#">Stocks</Link>
          </div>
          <div className="nav-item dflex align-center">
            <Icon name="pieChart" type="fa" size={22} />
            <Link to="#">Transactions</Link>
          </div>
          <div className="nav-item dflex align-center">
            <Icon name="cog" type="fa" size={22} />
            <Link to="#">Settings</Link>
          </div>
        </div>
      </section>
      <div className="home-redirect dflex align-center justify-center">
        <Icon name="home" type="fa" size={18} />
        <Link to="/">Back to homepage</Link>
      </div>
    </>
  );
};

export default Sidebar;
