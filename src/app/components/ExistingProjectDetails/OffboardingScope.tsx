// src/components/OffboardingScope.tsx
import React, { useState } from 'react';
import './OffboardingScope.css';
import svgPaths from '../../../imports/svg-m590sprq1z';

interface OffbordingScopeProps {
  onSelectOffBoardingScope: (value: string) => void;
  selectOffboadingScope: string;
}

const OffboardingScope: React.FC<OffbordingScopeProps> = ({
  onSelectOffBoardingScope,
  selectOffboadingScope,
}) => {
  const AlertIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={svgPaths.p341e8200} fill="#B86A0F" />
    </svg>
  );

  const options = [
    {
      id: 'project',
      title: 'Entire Project',
      description: 'All tools and users associated with this project will be revoked.',
    },
    {
      id: 'tools',
      title: 'Tools',
      description: 'Remove access to one or more tools.',
    },
    {
      id: 'users',
      title: 'Users',
      description: 'Remove user access from this project.',
    },
  ];

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Offboarding Scope</h2>
        <p className="description">Please select how you want to offboard selected Project.</p>
      </div>

      {selectOffboadingScope === 'project' && (
        <div className="info-offboard">
          <AlertIcon />
          <span className="info-span">
            You are requesting to offboard the Entire Project.Project will be offline once request
            is completed.
          </span>
        </div>
      )}
      {selectOffboadingScope === 'tools' && (
        <div className="info-offboard">
          <AlertIcon />
          <span className="info-span">
            You are offboarding selected tools only. Users will retain access to the project and
            remaining tools.
          </span>
        </div>
      )}

      {selectOffboadingScope === 'users' && (
        <div className="info-offboard">
          <AlertIcon />
          <span className="info-span">
            This request applies only to selected users.Other users,tools,and project access will
            not affected
          </span>
        </div>
      )}
      <div className="options-row">
        {options.map((opt) => (
          <label
            key={opt.id}
            className={`option-card ${selectOffboadingScope === opt.id ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="offboarding"
              value={opt.id}
              checked={selectOffboadingScope === opt.id}
              onChange={() => onSelectOffBoardingScope(opt.id)}
              style={{ width: '16px', height: '16px' }}
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
