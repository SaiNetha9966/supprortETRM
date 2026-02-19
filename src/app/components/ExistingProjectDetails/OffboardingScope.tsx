// src/components/OffboardingScope.tsx
import React, { useState } from "react";
import "./OffboardingScope.css";

const OffboardingScope: React.FC = () => {
  const [selected, setSelected] = useState<string>("");

  const options = [
    {
      id: "project",
      title: "Entire Project",
      description: "All tools and users associated with this project will be revoked."
    },
    {
      id: "tools",
      title: "Tools",
      description: "Remove access to one or more tools."
    },
    {
      id: "users",
      title: "Users",
      description: "Remove user access from this project."
    }
  ];

  return (
    <div className="container">
        <div className="header">
    <h2 className="title">Offboarding Scope</h2>
      <p className="description">Please select how you want to offboard selected Project.</p>

        </div>
     

       <div className="options-row">
        {options.map(opt => (
          <label key={opt.id} className={`option-card ${selected === opt.id ? "selected" : ""}`}>
            <input
              type="radio"
              name="offboarding"
              value={opt.id}
              checked={selected === opt.id}
              onChange={() => setSelected(opt.id)}
              style={{width:"16px" , height:"16px"}}
            />
            <div className="option-content">
              <h3>{opt.title}</h3>
              <p>{opt.description}</p>
            </div>
          </label>
        ))}
      </div>

    </div>
  );
};

export default OffboardingScope;