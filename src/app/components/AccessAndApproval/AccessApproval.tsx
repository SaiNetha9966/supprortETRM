import React, { useState } from 'react';

import { Buttons } from './Buttons';
import { Dropdown } from './DropDown';
import { SearchInput } from './SearchInput';

interface AccessApprovalProps {
}

const approverRoles = [
  'Partner - Managing Director',
  'Secondary Partner Managing Director',
  'Information Owner',
  'Delegate Information Owner',
  'Project Manager',
  'Approvers',
];

export const AccessApproval: React.FC<AccessApprovalProps> = () => {
  const [userEmail, setUserEmail] = useState('');
  const [toolsAccess, setToolsAccess] = useState('');
  const [addedUsers, setAddedUsers] = useState<Array<{ email: string; tools: string }>>([]);
  const [approvers, setApprovers] = useState<Record<string, string>>(
    approverRoles.reduce((acc, r) => ((acc[r] = ''), acc), {} as Record<string, string>)
  );

  const handleAddUser = () => {
    if (!userEmail.trim()) return;
    setAddedUsers((s) => [...s, { email: userEmail.trim(), tools: toolsAccess }]);
    setUserEmail('');
    setToolsAccess('');
  };

  const handleRemoveUser = (index: number) => {
    setAddedUsers((s) => s.filter((_, i) => i !== index));
  };

  const handleApproverChange = (role: string, value: string) => {
    setApprovers((prev) => ({ ...prev, [role]: value }));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 md:p-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-['Roboto',sans-serif] font-bold text-[#4a4a4a] text-base md:text-[17px]">
              Add User
            </h2>

            <div className="border border-[#8dca7e] rounded-lg p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* User Email Input */}
                <div className="lg:col-span-1">
                  <SearchInput
                    label="User Email ID"
                    value={userEmail}
                    required
                    onChange={setUserEmail}
                  />
                </div>

                {/* Tools Access Dropdown */}
                <div className="lg:col-span-1">
                  <Dropdown
                    label="Tools Access"
                    value={toolsAccess}
                    required
                    hasInfo
                    onChange={setToolsAccess}
                  />
                </div>

                {/* Buttons */}
                <div className="lg:col-span-1 flex items-end justify-start lg:justify-end gap-4">
                  <Buttons variant="secondary">Cancel</Buttons>
                  <Buttons variant="primary">Add</Buttons>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-['Roboto',sans-serif] font-bold text-[#28292c] text-lg md:text-[19px]">
              Approvers
            </h2>
            <p className="font-['Roboto',sans-serif] font-medium text-[#727272] text-sm md:text-[15px]">
              Designate approvers by selecting them from the active directory user list.
            </p>
          </div>

          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            <SearchInput
              label="Partner - Managing Director"
              value={approvers.partnerMD}
              onChange={(val) => setApprovers({ ...approvers, partnerMD: val })}
            />
            <SearchInput
              label="Secondary Partner Managing Director"
              value={approvers.secondaryPartnerMD}
              onChange={(val) => setApprovers({ ...approvers, secondaryPartnerMD: val })}
            />
            <SearchInput
              label="Information Owner"
              value={approvers.informationOwner}
              onChange={(val) => setApprovers({ ...approvers, informationOwner: val })}
            />
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            <SearchInput
              label="Delegate Information Owner"
              value={approvers.delegateIO}
              onChange={(val) => setApprovers({ ...approvers, delegateIO: val })}
            />
            <SearchInput
              label="Approvers"
              value={approvers.approvers}
              onChange={(val) => setApprovers({ ...approvers, approvers: val })}
            />
            <SearchInput
              label="Project Manager"
              value={approvers.projectManager}
              onChange={(val) => setApprovers({ ...approvers, projectManager: val })}
            />
          </div>
        </div>
      </div>
    </>

  );
};
