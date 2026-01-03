import React from 'react';
import styles from './Sidebar.module.css';
import svgPaths from '../../../imports/svg-m590sprq1z';

const ProjectSetupIcon: React.FC<{ active?: boolean }> = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d={svgPaths.p2423ab00} fill={active ? "white" : "#4a4a4a"} />
  </svg>
);

const ToolConfigIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d={svgPaths.p2fc53f00} fill="#b2b2b2" />
  </svg>
);

const AccessApprovalIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d={svgPaths.p2201a480} fill="#b2b2b2" />
  </svg>
);

const ReviewSubmitIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d={svgPaths.p3f471080} fill="#b2b2b2" />
  </svg>
);

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentStep }) => {
  const menuItems: MenuItem[] = [
    {
      id: 'project-setup',
      label: 'Project Setup',
      icon: <ProjectSetupIcon/>,
      active: currentStep === 'project-details',
      disabled: currentStep !== 'project-details',
    },
    {
      id: 'tool-configuration',
      label: 'Tool Configuration',
      icon: <ToolConfigIcon />,
      disabled: currentStep !== 'tool-configuration',
      active: currentStep === 'tool-configuration',
    },
    {
      id: 'access-approval',
      label: 'Access & Approval',
      icon: <AccessApprovalIcon />,
      disabled: currentStep !== 'access-approval',
      active: currentStep === 'access-approval',
    },
    {
      id: 'review-submit',
      label: 'Review & Submit',
      icon: <ReviewSubmitIcon />,
      disabled: currentStep !== 'review-submit',
      active: currentStep === 'review-submit',
    },
  ];

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.show : ''}`} onClick={onClose} />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <h2 className={styles.title}>New Non-Client Project</h2>
        <nav>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`${styles.menuItem} ${item.active ? styles.active : ''} ${item.disabled ? styles.disabled : ''}`}
            >
              <div className={styles.menuIcon}>{item.icon}</div>
              <div className={styles.menuLabel}>{item.label}</div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};