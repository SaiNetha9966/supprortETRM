import React, { useState } from 'react';
import styles from './AccessApproval.module.css';

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
  const [toolAccess, setToolAccess] = useState('');
  const [addedUsers, setAddedUsers] = useState<Array<{ email: string; tools: string }>>([]);
  const [approvers, setApprovers] = useState<Record<string, string>>(
    approverRoles.reduce((acc, r) => ((acc[r] = ''), acc), {} as Record<string, string>)
  );

  const handleAddUser = () => {
    if (!userEmail.trim()) return;
    setAddedUsers((s) => [...s, { email: userEmail.trim(), tools: toolAccess }]);
    setUserEmail('');
    setToolAccess('');
  };

  const handleRemoveUser = (index: number) => {
    setAddedUsers((s) => s.filter((_, i) => i !== index));
  };

  const handleApproverChange = (role: string, value: string) => {
    setApprovers((prev) => ({ ...prev, [role]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Access Control</h3>
        <p className={styles.cardSubtitle}>Associate Selection & Access Control - Define who needs access to which tools</p>

        <div className={styles.addUserBox}>
          <h4 className={styles.addUserTitle}>Add User</h4>
          <div className={styles.addUserForm}>
            <label className={styles.formField}>
              <div className={styles.formLabel}>User Email ID <span className={styles.required}>*</span></div>
              <input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Brown, James"
                className={styles.input}
              />
            </label>

            <label className={styles.formField}>
              <div className={styles.formLabel}>Tools Access <span className={styles.required}>*</span></div>
              <select value={toolAccess} onChange={(e) => setToolAccess(e.target.value)} className={styles.select}>
                <option value="">Select tools</option>
                <option>Teams Site 1</option>
                <option>Tool Builder 1</option>
                <option>Teams Site 2</option>
                <option>Tool Builder 2</option>
              </select>
            </label>

            <div className={styles.formActions}>
              <button className={styles.cancelBtn} onClick={() => { setUserEmail(''); setToolAccess(''); }}>Cancel</button>
              <button className={styles.addBtn} onClick={handleAddUser}>Add</button>
            </div>
          </div>

          {addedUsers.length > 0 && (
            <div className={styles.addedList}>
              {addedUsers.map((u, i) => (
                <div key={i} className={styles.addedItem}>
                  <div className={styles.itemEmail}>{u.email}</div>
                  <div className={styles.itemTools}>{u.tools || '—'}</div>
                  <button className={styles.removeBtn} onClick={() => handleRemoveUser(i)}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Approvers</h3>
        <p className={styles.cardSubtitle}>Designate approvers by selecting them from the active directory user list.</p>

        <div className={styles.approversGrid}>
          {approverRoles.map((role) => (
            <div key={role} className={styles.approverField}>
              <label className={styles.roleLabel}>{role}</label>
              <div className={styles.searchInputWrap}>
                <input
                  placeholder={role}
                  value={approvers[role]}
                  onChange={(e) => handleApproverChange(role, e.target.value)}
                  className={styles.input}
                />
                <button className={styles.searchBtn}>🔍</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
