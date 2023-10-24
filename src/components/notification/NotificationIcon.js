import { useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import { Link } from "react-router-dom";
import "./NotificationIcon.css";

function NotificationIcon({ list }) {
  const [showNotifications, setShowNotifications] = useState(false);

  function handleNotificationClick() {
    setShowNotifications(!showNotifications);
  }

  const notify = list ? list.filter((product) => product.quantity <= 10) : [];

  return (
    <div className="notification-icon-container">
      <div className="notification-icon" onClick={handleNotificationClick}>
        <BellOutlined style={{ color: "#fadb14" }} />
        {list && list.length > 0 && (
          <span className="notification-count">{notify.length}</span>
        )}
      </div>
      {showNotifications && (
        <div className="notification-list-container">
          {notify.map((item) => (
            <Alert
              key={item.id}
              message="warning"
              showIcon
              description={
                <span>
                  The product{" "}
                  <Link to={`/product/${item.id}`}>{item.name}</Link> has a quantity of 10 or less. We recommend stocking up as soon as possible to ensure you have enough stock to meet your customer demands.
                </span>
              }
              type="warning"
              style={{ marginBottom: "16px" }}
              closable
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationIcon;