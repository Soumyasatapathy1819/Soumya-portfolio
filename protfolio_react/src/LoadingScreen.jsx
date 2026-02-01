import React from "react";

const LoadingScreen = ({ isLoading }) => {
  return (
    <div className={`loader-wrapper ${!isLoading ? 'loader-fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-circle"></div>
        <p className="loader-text">Initializing Creative Systems...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;