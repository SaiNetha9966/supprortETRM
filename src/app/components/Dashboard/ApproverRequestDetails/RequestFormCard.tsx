// RequestForms.tsx
import React from "react";
import "./RequestForms.css";

interface RequestFormCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const RequestFormCard: React.FC<RequestFormCardProps> = ({
  title,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <div className="form-card">
      <h3 className="form-title">{title}</h3>
      <p className="form-description">{description}</p>
      <button className="form-button" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};


export default RequestFormCard;
