import React, { useState } from 'react';
import styles from './Header.module.css';
import svgPaths from '../../../imports/svg-m590sprq1z';

const AlixLogo: React.FC = () => (
  <svg width="18.897" height="21" viewBox="0 0 18.8967 21" fill="none">
    <path clipRule="evenodd" fillRule="evenodd" d={svgPaths.pa93f100} fill="white" />
  </svg>
);

const ExpandMoreIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d={svgPaths.p15d61c00} fill="white" />
  </svg>
);

const NotificationIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d={svgPaths.p342e1200} fill="white" />
  </svg>
);

const HelpIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d={svgPaths.p11e5c600} fill="white" />
  </svg>
);

interface HeaderProps {
  onMenuToggle?: () => void;
  onNavigateDashBoard: (type: string) => void;
  dashBoardType: string;
  selectedDropdown:string;
  setSelectedDropdown: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  onNavigateDashBoard,
  dashBoardType,
  selectedDropdown,
  setSelectedDropdown
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [selectedDropdown, setSelectedDropdown] = useState<string>('ETRF');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((open) => !open);
  };
  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };
  const handleDropdownSelect = (option: string) => {
    setSelectedDropdown(option);
    setDropdownOpen(false);
    if (window.setRequestType) {
      window.setRequestType(option);
    }
  };

  const handleHamburgerClick = () => {
    if (onMenuToggle) {
      onMenuToggle();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <AlixLogo />
        <div className={styles.separator} />
        <div className={styles.projectName}>
          {' '}
          {dashBoardType === 'newrequest' ? 'ETRM' : 'Technology Request Management Portal'}{' '}
        </div>
      </div>
      <div className={styles.rightSection}>
        <nav className={`${styles.navigation} ${menuOpen ? styles.open : ''}`}>
          <div
            className={
              dashBoardType === 'dashboard' ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
            onClick={() => onNavigateDashBoard('dashboard')}
          >
            Dashboard
          </div>
          <div
            className={styles.navItem}
            onClick={handleDropdownToggle}
            style={{ position: 'relative' }}
            tabIndex={0}
            onBlur={handleDropdownClose}
          >
            New Request
            <ExpandMoreIcon />
            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  borderRadius: 4,
                  minWidth: 132,
                  zIndex: 10,
                  marginTop: 4,
                  padding: '4px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '0 4px',
                    height: 24,
                    borderRadius: 2,
                    background: selectedDropdown === 'ETRF' ? '#eaf7e6' : 'white',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    handleDropdownSelect('ETRF');
                    onNavigateDashBoard('newrequest');
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <span
                    style={{
                      marginLeft: 4,
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 13,
                      color: '#4A4A4A',
                      textAlign: 'left',
                    }}
                  >
                    ETRF
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '0 4px',
                    height: 24,
                    borderRadius: 2,
                    background: selectedDropdown === 'ITRF' ? '#eaf7e6' : 'white',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    handleDropdownSelect('ITRF');
                    onNavigateDashBoard('newrequest');
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <span
                    style={{
                      marginLeft: 4,
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: 13,
                      color: '#4A4A4A',
                      textAlign: 'left',
                    }}
                  >
                    ITRF
                  </span>
                </div>
              </div>
            )}
          </div>
        </nav>
        <div className={styles.iconButton}>
          <svg
            width="2"
            height="26"
            viewBox="0 0 2 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="2" height="26" fill="#727272" />
          </svg>
        </div>
        <div className={styles.iconButton}>
          <NotificationIcon />
          <div className={styles.badge}>4</div>
        </div>
        <div className={styles.iconButton}>
          <HelpIcon />
        </div>
        <div className={styles.userAvatar}>JB</div>
      </div>
    </header>
  );
};
