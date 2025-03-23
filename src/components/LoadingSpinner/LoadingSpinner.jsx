import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <div
        style={{
          border: " 16px solid #060505",
          borderTop: "16px solid #3498db",
          borderRadius: "50%",
          width: "120px",
          height: "120px",
          animation: "spin 2s linear infinite",
        }}
      >
        .
      </div>
    </div>
  );
};

export default LoadingSpinner;
