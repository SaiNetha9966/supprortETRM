import React, { useState } from 'react';
import styles from './ReviewSubmit.module.css';
import EditButton from './EditButton';

interface ReviewSubmitProps {
  onSubmit?: () => void;
  onDiscard?: () => void;
  onBack?: () => void;
}

const sampleProject = {
  ertmId: 'PRJ-8YV03FK',
  sapId: 'SAP-PRJ001',
  codeName: 'PCN-0001',
  type: 'Development',
  start: 'January 7th, 2026',
  end: 'January 30th, 2026',
  personalData: 'Yes',
  goals: 'NA',
};

const sampleTools = {
  teamsSite: 'AlixPartner Platform',
  toolBuilder: 'AlixPartner Platform',
  domain: 'alixpartner.com',
};

const sampleAccess = [
  { id: 1, name: 'Brown, James', email: 'jbrown@alixpartners.com', role: 'Full Access (6 Tools)' },
  { id: 2, name: 'Smith, Emily', email: 'esmith@alixpartners.com', role: 'Access (3 Tools)' },
  { id: 3, name: 'Doe, John', email: 'jdoe@alixpartners.com', role: 'Access (4 Tools)' },
];

const sampleApprovers = [
  { id: 1, title: 'Partner - Managing Director', name: 'Quentin Sharp' },
  { id: 2, title: 'Secondary Partner Managing Director', name: 'Leo Kapoor' },
  { id: 3, title: 'Information Owner', name: 'Naomi Weber' },
  { id: 4, title: 'Delegate Information Owner', name: 'Marcus Rey' },
  { id: 5, title: 'Project Manager', name: 'Lana Delman' },
  { id: 6, title: 'Approvers', name: 'Isaac Cosner, Jessica Davis, Joshua White' },
];

export const ReviewSubmit: React.FC<ReviewSubmitProps> = ({ onSubmit, onDiscard, onBack }) => {
  const [agreed, setAgreed] = useState(false);
  const [openAccess, setOpenAccess] = useState<Record<number, boolean>>({});

  const toggleAccess = (id: number) => {
    setOpenAccess((s) => ({ ...s, [id]: !s[id] }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainGrid}>
        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Request Type</div>
              <div className={styles.cardSubtitle}>New Non-Client Project</div>
            </div>
            <EditButton />
          </div>
        </div>

        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Project Details</div>
            <EditButton />
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <div className={styles.label}>ERTM Project ID</div>
              <div className={styles.value}>{sampleProject.ertmId}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.label}>SAP Project ID</div>
              <div className={styles.value}>{sampleProject.sapId}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.label}>Project Code Name</div>
              <div className={styles.value}>{sampleProject.codeName}</div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.label}>What Type of Project it is?</div>
              <div className={styles.value}>{sampleProject.type}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.label}>Estimated Start Date</div>
              <div className={styles.value}>{sampleProject.start}</div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.label}>Estimated End Date</div>
              <div className={styles.value}>{sampleProject.end}</div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.label}>Will you use Personal or Protected data?</div>
              <div className={styles.value}>{sampleProject.personalData}</div>
            </div>
            <div className={styles.detailItem} style={{ gridColumn: '1 / -1' }}>
              <div className={styles.label}>Describe your project and its goals.</div>
              <div className={styles.value}>{sampleProject.goals}</div>
            </div>
          </div>
        </div>

        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Tools Selection</div>
            <EditButton />
          </div>
          <div className={styles.toolsGrid}>
            <div>
              <div className={styles.label}>Teams Site</div>
              <div className={styles.value}>{sampleTools.teamsSite}</div>
            </div>
            <div>
              <div className={styles.label}>Tool Builder</div>
              <div className={styles.value}>{sampleTools.toolBuilder}</div>
            </div>
            <div>
              <div className={styles.label}>Container Utilization Optimizer
              </div>
              <div className={styles.value}>{sampleTools.toolBuilder}</div>
            </div>
            <div>
              <div className={styles.label}>Company Health Check

              </div>
              <div className={styles.value}>{sampleTools.toolBuilder}</div>
            </div>
            <div>
              <div className={styles.label}>Radial Tool (ROA)

              </div>
              <div className={styles.value}>{sampleTools.toolBuilder}</div>
            </div>
            <div>
              <div className={styles.label}>Spend X-Ray
              </div>
              <div className={styles.value}>{sampleTools.toolBuilder}</div>
            </div>

          </div>
        </div>

        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Tool Specification </div>
            <EditButton />
          </div>
          <div className={styles.toolsGrid}>
            <div style={{ backgroundColor: '#F7F7F7', width: '280px', height: '177px', padding: '12px', gap: '16px' }}>
              <div className={styles.label}>Teams Site</div>
              <div className={styles.value}>{sampleTools.teamsSite}</div>
              <div className={styles.label}>Trust External Domain?:</div>
              <div className={styles.value}>Yes</div>

              <div className={styles.label}>External Domain Name?:
              </div>
              <div className={styles.value}>
                www.externaldomain.com</div>
            </div>
            <div style={{ backgroundColor: '#F7F7F7', width: '280px', height: '177px', padding: '12px', gap: '16px' }}>
              <div className={styles.label}>Teams Site</div>
              <div className={styles.value}>{sampleTools.teamsSite}</div>
              <div className={styles.label}>Trust External Domain?:</div>
              <div className={styles.value}>Yes</div>

              <div className={styles.label}>External Domain Name?:
              </div>
              <div className={styles.value}>
                www.externaldomain.com</div>
            </div>
            <div style={{ backgroundColor: '#F7F7F7', width: '280px', height: '177px', padding: '12px', gap: '16px' }}>
              <div className={styles.label}>Teams Site</div>
              <div className={styles.value}>{sampleTools.teamsSite}</div>
              <div className={styles.label}>Trust External Domain?:</div>
              <div className={styles.value}>Yes</div>

              <div className={styles.label}>External Domain Name?:
              </div>
              <div className={styles.value}>
                www.externaldomain.com</div>
            </div>
            <div style={{ backgroundColor: '#F7F7F7', width: '280px', height: '177px', padding: '12px', gap: '16px' }}>
              <div className={styles.label}>Teams Site</div>
              <div className={styles.value}>{sampleTools.teamsSite}</div>
              <div className={styles.label}>Trust External Domain?:</div>
              <div className={styles.value}>Yes</div>

              <div className={styles.label}>External Domain Name?:
              </div>
              <div className={styles.value}>
                www.externaldomain.com</div>
            </div>
            <div style={{ backgroundColor: '#F7F7F7', width: '280px', height: '177px', padding: '12px', gap: '16px' }}>
              <div className={styles.label}>Teams Site</div>
              <div className={styles.value}>{sampleTools.teamsSite}</div>
              <div className={styles.label}>Trust External Domain?:</div>
              <div className={styles.value}>Yes</div>

              <div className={styles.label}>External Domain Name?:
              </div>
              <div className={styles.value}>
                www.externaldomain.com</div>
            </div>
            <div style={{ backgroundColor: '#F7F7F7', width: '280px', height: '177px', padding: '12px', gap: '16px' }}>
              <div className={styles.label}>Teams Site</div>
              <div className={styles.value}>{sampleTools.teamsSite}</div>
              <div className={styles.label}>Trust External Domain?:</div>
              <div className={styles.value}>Yes</div>

              <div className={styles.label}>External Domain Name?:
              </div>
              <div className={styles.value}>
                www.externaldomain.com</div>
            </div>
          </div>
        </div>

        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Approvers</div>
            <EditButton />
          </div>
          <div className={styles.approverGrid}>
            {sampleApprovers.map((p) => (
              <div key={p.id} className={styles.approverItem}>
                <div className={styles.approverTitle}>{p.title}</div>
                <div className={styles.approverName}>{p.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Access Control</div>
            <EditButton />
          </div>

          <div className={styles.accessList}>
            {sampleAccess.map((a) => (
              <div key={a.id} className={styles.accessRow}>
                <div className={styles.accessMain} onClick={() => toggleAccess(a.id)}>
                  <div>
                    <div className={styles.accessName}>{a.name}</div>
                  </div>
                  <div>
                    <div className={styles.accessEmail}>{a.email}</div>

                  </div>
                  <div className={styles.accessMeta}>
                    <div className={styles.rolePill}>{a.role}</div>
                  </div>
                </div>

                {openAccess[a.id] && (
                  <div className={styles.accessExpand}>
                    <div>Tools: Tool A, Tool B, Tool C</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReviewSubmit;
