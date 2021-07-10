import React from "react";
import { Icon } from "../../components/common";

const BalanceCard = ({ title, color, iconColor, amount }) => {
  return (
    <div className="dflex align-center balance-item">
      <div className="balance-icon" style={{ backgroundColor: color }}>
        <Icon
          name="ic_account_balance"
          type="md"
          size={30}
          style={{ color: iconColor }}
        />
      </div>
      <div className="flex-column balance-content">
        <p>{title}</p>
        <span>NGN {amount}</span>
      </div>
    </div>
  );
};

export default BalanceCard;
