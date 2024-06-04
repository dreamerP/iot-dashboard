import React from "react";

const Notification = ({ open, message, severity }) => {
  if (!open) return null;

  return (
    <div className={`alert alert-${severity}`} role="alert">
      <strong className="font-bold">
        {severity === "error" ? "Error!" : "Success!"}
      </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default Notification;
