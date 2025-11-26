import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
};

export default Spinner;
