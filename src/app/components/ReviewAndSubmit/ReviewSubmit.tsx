import React, { useState } from 'react';
import styles from './ReviewSubmit.module.css';
import EditButton from './EditButton';
import { findNameByEmail, formatDate } from '../Utils/UiUtilis';

interface ReviewSubmitProps {
  onSubmit?: () => void;
  onDiscard?: () => void;
  onBack?: () => void;
  existingProject?: string;
  formData: any;
  data: any;
  existingProjectMetadata?: any;
  existingProjectDetailsFormData?: any;
  existingToolFormData?: any;
  handleChange: (field: string, value: any) => void;
}

const sampleAccess = [
  {
    id: 1,
    name: 'Brown, James',
    email: 'jbrown@alixpartners.com',
    role: 'Full Access (6 Tools)',
    tools: [
      { name: 'Teams Site', checked: true },
      { name: 'Tool Builder', checked: true },
      { name: 'Company Health Check', checked: true },
    ],
  },
  {
    id: 2,
    name: 'Smith, Emily',
    email: 'esmith@alixpartners.com',
    role: 'Access (3 Tools)',
    tools: [
      { name: 'Teams Site', checked: true },
      { name: 'Tool Builder', checked: true },
      { name: 'Company Health Check', checked: false },
    ],
  },
  {
    id: 3,
    name: 'Doe, John',
    email: 'jdoe@alixpartners.com',
    role: 'Access (4 Tools)',
    tools: [
      { name: 'Teams Site', checked: true },
      { name: 'Tool Builder', checked: false },
      { name: 'Company Health Check', checked: true },
    ],
  },
];

export const ReviewSubmit: React.FC<ReviewSubmitProps> = ({
  onSubmit,
  onDiscard,
  onBack,
  existingProject,
  formData,
  data,
  existingProjectMetadata,
  existingProjectDetailsFormData,
  existingToolFormData,
  handleChange,
}) => {
  const [openAccess, setOpenAccess] = useState<Record<number, boolean>>({});
  const isExistingProject = existingProject === 'yes';
  const existingRecord =
    existingProjectMetadata?.result?.existing_record_id ??
    existingProjectMetadata?.result ??
    existingProjectMetadata ??
    null;
  const selectedProjectKey = existingProjectDetailsFormData?.selectedProjectKey ?? '';
  const toolCatalog = data?.result?.tools ?? [];

  const normalizeNameValueMap = (value: any): Record<string, string[]> => {
    if (!value) return {};
    if (Array.isArray(value)) {
      return value.reduce((acc: Record<string, string[]>, entry: any) => {
        if (!entry || typeof entry !== 'object') return acc;
        const [name, tools] = Object.entries(entry)[0] ?? [];
        if (!name) return acc;
        const toolList = Array.isArray(tools) ? tools : [tools];
        acc[name as string] = [
          ...(acc[name as string] ?? []),
          ...toolList.filter(Boolean).map(String),
        ];
        return acc;
      }, {});
    }
    if (typeof value === 'object') return value as Record<string, string[]>;
    return {};
  };

  const toggleAccess = (id: number) => {
    setOpenAccess((s) => ({ ...s, [id]: !s[id] }));
  };

  const usersList = data?.result?.users || [];
  //   const findNameByEmail = (email?: string) => {
  //   if (!email) return '';
  //   const e = email.trim();
  //   const user = usersList.find((u: any) => (u.emailID || '').toLowerCase() === e.toLowerCase());
  //   return user?.name || email;
  // };

  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const toTitleCase = (value: string) =>
    value.replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  const getToolNameFromSlug = (slug: string) => {
    const match = toolCatalog.find(
      (tool: any) => toSlug(tool?.ToolName ?? tool?.Tool_name ?? tool?.name ?? '') === slug
    );
    return match?.ToolName ?? match?.Tool_name ?? match?.name ?? toTitleCase(slug);
  };

  const getToolCategoryFromSlug = (slug: string) => {
    const match = toolCatalog.find(
      (tool: any) => toSlug(tool?.ToolName ?? tool?.Tool_name ?? tool?.name ?? '') === slug
    );
    return match?.Category ?? match?.category ?? match?.platform ?? 'Existing Tool';
  };

  const existingToolsFromMetadata = (existingProjectMetadata?.result?.existingtools ?? []).map(
    (slug: string) => ({
      ToolName: getToolNameFromSlug(slug),
      Category: getToolCategoryFromSlug(slug),
    })
  );

  const existingToolSlugs = new Set(
    existingToolsFromMetadata.map((tool: any) => toSlug(tool?.ToolName ?? ''))
  );

  const newToolsFromExistingFlow = (existingToolFormData?.selectedTools ?? []).filter(
    (tool: any) =>
      !existingToolSlugs.has(toSlug(tool?.ToolName ?? tool?.Tool_name ?? tool?.name ?? ''))
  );

  const newToolSlugs = new Set(
    newToolsFromExistingFlow.map((tool: any) =>
      toSlug(tool?.ToolName ?? tool?.Tool_name ?? tool?.name ?? '')
    )
  );

  const toolsForDisplay = isExistingProject
    ? [...existingToolsFromMetadata, ...newToolsFromExistingFlow]
    : (formData.selectedTools ?? []);

  const toolSpecsForDisplay = isExistingProject
    ? (existingToolFormData?.toolsSpecifications ?? [])
    : (formData.toolsSpecifications ?? []);

  const isYesValue = (value: any) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value === 1;
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      return normalized === 'yes' || normalized === 'true' || normalized === '1';
    }
    return false;
  };

  const sanitizeToolAccess = (tools: any[]) =>
    (tools ?? [])
      .map((tool) => (typeof tool === 'string' ? tool : (tool?.ToolName ?? tool?.name ?? '')))
      .map((tool) => tool?.trim())
      .filter(Boolean);

  const existingAccessList = Object.entries(
    normalizeNameValueMap(
      existingRecord?.namevalue ?? existingRecord?.nameValuePairs ?? existingRecord?.nameValue ?? {}
    )
  ).map(([name, tools]) => ({
    name,
    email: usersList.find((u: any) => u?.name === name)?.emailID ?? '',
    toolAccess: sanitizeToolAccess((tools as string[]).map(getToolNameFromSlug)),
  }));

  const newAccessList = (formData.userSelectionsAndToolAcees ?? []).map((a: any) => ({
    name: findNameByEmail(a?.email?.trim(), usersList),
    email: a?.email ?? '',
    toolAccess: sanitizeToolAccess(a?.toolAccess ?? []),
  }));

  const accessKey = (item: any) => (item?.email || item?.name || '').toLowerCase();
  const mergedAccessMap = new Map<string, any>();
  existingAccessList.forEach((item) => {
    const key = accessKey(item);
    if (key) mergedAccessMap.set(key, item);
  });
  newAccessList.forEach((item) => {
    const key = accessKey(item);
    if (!key) return;
    const existingItem = mergedAccessMap.get(key);
    if (existingItem) {
      const mergedToolAccess = Array.from(
        new Set([...(existingItem.toolAccess ?? []), ...(item.toolAccess ?? [])])
      );
      mergedAccessMap.set(key, {
        ...existingItem,
        ...item,
        toolAccess: mergedToolAccess,
      });
      return;
    }
    mergedAccessMap.set(key, item);
  });
  const mergedExistingAccessList = Array.from(mergedAccessMap.values());

  const accessListForDisplay = isExistingProject
    ? mergedExistingAccessList
    : (formData.userSelectionsAndToolAcees ?? []);
  const cleanedAccessListForDisplay = accessListForDisplay.filter((item: any) => {
    const hasIdentity = Boolean(item?.email || item?.name);
    const toolCount = Array.isArray(item?.toolAccess) ? item.toolAccess.length : 0;
    return hasIdentity && toolCount > 0;
  });

  return (
    <div className={styles.container}>
      <div className={styles.mainGrid}>
        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div>
            <div className={styles.cardTitle}>Request Summary</div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <div className={styles.label}>Request Category</div>
                <div className={styles.value}>Non Client Project</div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.label}>Request Action</div>
                <div className={styles.value}>
                  {isExistingProject ? 'Onboarding, Existing Project' : 'Onboarding, New Project'}
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.label}>Change Type</div>
                <div className={styles.value}>Add Tools and Users</div>
              </div>
            </div>
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
              <div className={styles.value}>
                {isExistingProject ? selectedProjectKey : formData.ertmProjectId}
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.label}>SAP Project ID</div>
              <div className={styles.value}>
                {isExistingProject
                  ? (existingRecord?.sap_project_id ?? existingRecord?.sapProjectId)
                  : formData.sapProjectId}
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.label}>Project Code Name</div>
              <div className={styles.value}>
                {isExistingProject
                  ? (existingRecord?.project_code_name ??
                    existingRecord?.codename ??
                    existingRecord?.projectCodeName)
                  : formData.projectCodeName}
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.label}>Project Type</div>
              <div className={styles.value}>
                {isExistingProject
                  ? (existingRecord?.project_type ?? existingRecord?.projectType)
                  : formData.projectType}
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.label}>Estimated Start Date</div>
              <div className={styles.value}>
                {formatDate(
                  isExistingProject
                    ? (existingRecord?.estimated_start_date ?? existingRecord?.estimatedStartDate)
                    : formData.estimatedStartDate
                )}
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.label}>Estimated End Date</div>
              <div className={styles.value}>
                {formatDate(
                  isExistingProject
                    ? (existingRecord?.estimated_end_date ?? existingRecord?.estimatedEndDate)
                    : formData.estimatedEndDate
                )}
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.label}>Is Personal or Protected Data Involved?</div>
              <div className={styles.value}>
                {isExistingProject
                  ? (existingRecord?.are_you_planning_to_use_any_personal_or_protected_data ??
                    existingRecord?.personalOrprotectedData)
                  : formData.personalOrprotectedData}
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.label}>Describe your project and its goals.</div>
              <div className={styles.value}>
                {isExistingProject
                  ? (existingRecord?.please_describe ?? existingRecord?.description)
                  : formData.description}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              Tools Selection
              {isExistingProject && (
                <span>
                  {' '}
                  ({existingToolsFromMetadata.length} existing tools ·{' '}
                  {newToolsFromExistingFlow.length} new tool
                  {newToolsFromExistingFlow.length === 1 ? '' : 's'} added)
                </span>
              )}
            </div>
            <EditButton />
          </div>
          <div className={styles.toolsGrid}>
            {toolsForDisplay.map((tool: any, index: number) => (
              <div key={index}>
                <div className={styles.label}>{tool.ToolName}</div>
                <div className={styles.value}>{tool.Category}</div>
                {isExistingProject && newToolSlugs.has(toSlug(tool.ToolName ?? '')) && (
                  <span className={styles.newToolBadge}>New Tool</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          {/* Header */}
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Tool Specification</div>
            <EditButton />
          </div>

          {/* Tools Grid */}
          <div className={styles.toolsGrid}>
            {toolSpecsForDisplay.map((tool: any, index: number) => (
              <div key={index} className={styles.toolCard}>
                <div className={styles.toolTitle}>{tool.toolName}</div>
                <div className={styles.label}>Trust External Domain?:</div>
                <div className={styles.value}>
                  {isYesValue(tool.trustExternalDomain) ? 'Yes' : 'No'}
                </div>
                {isYesValue(tool.trustExternalDomain) && (
                  <>
                    <div className={styles.label}>External Domain Name?:</div>
                    <div className={styles.value}>{tool.externalDomainName || 'N/A'}</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Approvers</div>
            <EditButton />
          </div>
          <div className={styles.approverGrid}>
            <div className={styles.approverItem}>
              <div className={styles.approverTitle}>Primary PMD/Partner</div>
              <div className={styles.approverName}>
                {findNameByEmail(formData.primaryPmdPartner, usersList)}
              </div>
            </div>
            <div className={styles.approverItem}>
              <div className={styles.approverTitle}>Secondary PMD/Partner</div>
              <div className={styles.approverName}>
                {findNameByEmail(formData.secondoryPmdPartner, usersList)}
              </div>
            </div>
            <div className={styles.approverItem}>
              <div className={styles.approverTitle}>Information Owner</div>
              <div className={styles.approverName}>
                {findNameByEmail(formData.informationOwner, usersList)}
              </div>
            </div>
            <div className={styles.approverItem}>
              <div className={styles.approverTitle}>Delegate Information Owner</div>
              <div className={styles.approverName}>
                {findNameByEmail(formData.delegateIformationOwner, usersList)}
              </div>
            </div>
            <div className={styles.approverItem}>
              <div className={styles.approverTitle}>Project Manager</div>
              <div className={styles.approverName}>
                {findNameByEmail(formData.projectManager, usersList)}
              </div>
            </div>
            <div className={styles.approverItem}>
              <div className={styles.approverTitle}>Approvers</div>
              <div className={styles.approverName}>
                {findNameByEmail(formData.approvers, usersList)}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>User Selection & Tool Access</div>
            <EditButton />
          </div>

          <div className={styles.accessList}>
            {cleanedAccessListForDisplay.map((a: any, idx: number) => (
              <div key={`${a.email || a.name}-${idx}`} className={styles.accessRow}>
                <div className={styles.accessMain} onClick={() => toggleAccess(idx)}>
                  <div className={styles.accessInfo}>
                    <div className={styles.accessName}>
                      {isExistingProject
                        ? a.name || ''
                        : findNameByEmail(a?.email?.trim(), usersList)}
                    </div>
                    <div className={styles.accessEmail}>{a.email || ''}</div>
                  </div>
                  <div className={styles.accessRight}>
                    <div className={styles.rolePill}>
                      Limited Access {a?.toolAccess?.length || 0}
                    </div>
                    <button
                      className={styles.expandBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAccess(idx);
                      }}
                    >
                      <svg
                        className={`w-5 h-5 transition-transform ${openAccess[idx] ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {openAccess[idx] && (
                  <div className={styles.accessExpand}>
                    <div className={styles.toolsLabel}>Tools</div>
                    <div className={styles.toolsCheckboxes}>
                      {(a.toolAccess ?? []).map((tool: any, idxn: number) => (
                        <label key={idxn} className={styles.toolCheckbox}>
                          <input type="checkbox" checked={true} readOnly />
                          <span>{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.card} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Memo to approving MD</div>
          </div>

          <div className={styles.memoBody}>
            <div className={styles.textareaWrapper}>
              <textarea
                className={styles.textarea}
                value={formData.memoToApprovainMd}
                onChange={(e) => {
                  handleChange('memoToApprovainMd', e.target.value);
                }}
                maxLength={80}
              />
              <div className={styles.wordCounter}>{formData.memoToApprovainMd?.length || 0}/80</div>
            </div>

            <p className={styles.attestation}>
              By requesting the creation of this project, you are attesting to the understanding of
              any client contractual obligations including but not limited to data security,
              privacy, and SLAs related to this data and engagement. You understand that there may
              be costs incurred to the Firm and/or the project's budget. The information above has
              been filled out to the best of your knowledge.
            </p>

            <label className={styles.attestationCheckbox}>
              <input
                type="checkbox"
                checked={formData.confirmation}
                onChange={(e) => handleChange('confirmation', e.target.checked)}
              />
              <span>
                {' '}
                <span style={{ color: 'red' }}>* </span>Yes, I understand the above statement
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
