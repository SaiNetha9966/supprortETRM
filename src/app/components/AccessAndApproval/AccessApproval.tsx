import React, { useEffect, useRef, useState } from 'react';

import { Buttons } from './Buttons';
import { Dropdown } from './DropDown';
import { SearchInput } from './SearchInput';
import svgPaths from '../../../imports/svg-m590sprq1z';
import { findNameByEmail } from '../Utils/UiUtilis';

interface AccessApprovalProps {
  existingProject?: string;
  data?: any;
  existingProjectMetadata?: any;
  existingToolFormData?: any;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (field: string, value: string | string[]) => void;
  isDraftProject: boolean;
}

const approverRoles = [
  'Partner - Managing Director',
  'Secondary Partner Managing Director',
  'Information Owner',
  'Delegate Information Owner',
  'Project Manager',
  'Approvers',
];

export const AccessApproval: React.FC<AccessApprovalProps> = ({
  existingProject,
  data,
  existingProjectMetadata,
  existingToolFormData,
  formData,
  setFormData,
  handleChange,
  isDraftProject,
}) => {
  const [userEmail, setUserEmail] = useState('');
  const [toolsAccess, setToolsAccess] = useState<string[]>([]);
  const [addedUsers, setAddedUsers] = useState<
    Array<{ name: string; email: string; tools: string[] }>
  >([]);
  const [expandedUsers, setExpandedUsers] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<string[]>([]);

  // Suggestions for user email input
  const [userEmailSuggestions, setUserEmailSuggestions] = useState<string[]>([]);

  // Suggestions for each approver field
  const [approverSuggestions, setApproverSuggestions] = useState<Record<string, string[]>>({});

  // Track search input for each approver field
  const [approverSearchInput, setApproverSearchInput] = useState<Record<string, string>>({});
  const hasInitializedExisting = useRef(false);
  const initialExistingUsersCount = useRef(0);

  // Email list and user list from data
  const emailList = data?.result?.users?.map((user: any) => user.emailID) || [];
  const userList = data?.result?.users || [];
  const allTools = data?.result?.tools || [];

  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const existingUserNameSet = new Set(
    Object.keys(existingProjectMetadata?.result?.existing_record_id?.namevalue ?? {})
  );

  const toTitleCase = (value: string) =>
    value.replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  const getToolNameFromSlug = (slug: string) => {
    const match = allTools.find(
      (tool: any) => toSlug(tool?.ToolName ?? tool?.Tool_name ?? tool?.name ?? '') === slug
    );
    return match?.ToolName ?? match?.Tool_name ?? match?.name ?? toTitleCase(slug);
  };

  const selectedToolsList =
    existingProject === 'yes'
      ? (existingToolFormData?.selectedTools ?? [])
      : (formData?.selectedTools ?? []);

  const existingToolSlugs = new Set(
    (existingProjectMetadata?.result?.existingtools ?? []).map((slug: string) => toSlug(slug))
  );

  const selectedToolNames = (() => {
    const toolMap = new Map<string, string>();
    const addToolName = (name: string) => {
      const trimmed = name?.trim();
      if (!trimmed) return;
      const slug = toSlug(trimmed);
      if (!toolMap.has(slug)) toolMap.set(slug, trimmed);
    };

    if (existingProject === 'yes') {
      (existingProjectMetadata?.result?.existingtools ?? [])
        .map((slug: string) => getToolNameFromSlug(slug))
        .forEach((name: string) => addToolName(name));
    }

    selectedToolsList
      .map((tool: any) => tool?.ToolName ?? tool?.Tool_name ?? tool?.name ?? '')
      .forEach((name: string) => addToolName(name));

    return Array.from(toolMap.values());
  })();

  const toolOptions = selectedToolNames.map((name) => {
    const slug = toSlug(name);
    const match = allTools.find(
      (tool: any) => toSlug(tool?.ToolName ?? tool?.Tool_name ?? tool?.name ?? '') === slug
    );
    return {
      label: name,
      value: name,
      category: existingToolSlugs.has(slug)
        ? 'Existing Tool'
        : (match?.Category ?? match?.category ?? match?.platform ?? 'Selected Tool'),
    };
  });

  const findEmailByName = (name: string) => {
    const match = userList.find((user: any) => user?.name === name);
    return match?.emailID ?? '';
  };

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

  useEffect(() => {
    if (existingProject !== 'yes') return;
    if (hasInitializedExisting.current) return;

    const record =
      existingProjectMetadata?.result?.existing_record_id ??
      existingProjectMetadata?.result ??
      existingProjectMetadata;
    if (!record) return;

    setFormData((prev: any) => ({
      ...prev,
      primaryPmdPartner: prev.primaryPmdPartner || record.managing_director || '',
      secondoryPmdPartner: prev.secondoryPmdPartner || record.secondary_managing_director || '',
      informationOwner: prev.informationOwner || record.md || '',
      delegateIformationOwner:
        prev.delegateIformationOwner || record.delegated_information_owner || '',
      projectManager: prev.projectManager || record.project_manager || '',
      approvers: prev.approvers || record.approvers || '',
    }));

    const nameValue = normalizeNameValueMap(
      record.namevalue ?? record.nameValuePairs ?? record.nameValue ?? {}
    );
    initialExistingUsersCount.current = Object.keys(nameValue).length;
    const mappedUsers = Object.entries(nameValue).map(([name, tools]) => ({
      name,
      email: findEmailByName(name),
      tools: (tools as string[]).map(getToolNameFromSlug),
    }));

    const selectionUsers = (formData?.userSelectionsAndToolAcees ?? []).map((entry: any) => ({
      name: findNameByEmail(entry?.email, userList) || entry?.email || '',
      email: entry?.email ?? '',
      tools: Array.isArray(entry?.toolAccess) ? entry.toolAccess : [],
    }));

    const mergedUsersMap = new Map<string, { name: string; email: string; tools: string[] }>();
    const addUserToMap = (user: { name: string; email: string; tools: string[] }) => {
      const key = (user.email || user.name || '').toLowerCase();
      if (!key) return;
      const existingUser = mergedUsersMap.get(key);
      if (existingUser) {
        mergedUsersMap.set(key, {
          ...existingUser,
          tools: Array.from(new Set([...(existingUser.tools ?? []), ...(user.tools ?? [])])),
        });
        return;
      }
      mergedUsersMap.set(key, user);
    };

    mappedUsers.forEach(addUserToMap);
    selectionUsers.forEach(addUserToMap);
    const mergedUsers = Array.from(mergedUsersMap.values());

    if (mergedUsers.length > 0) {
      setAddedUsers(mergedUsers);
      setFormData((prev: any) => ({
        ...prev,
        userSelectionsAndToolAcees: prev.userSelectionsAndToolAcees?.length
          ? prev.userSelectionsAndToolAcees
          : mappedUsers.map((user) => ({
              email: user.email,
              toolAccess: user.tools,
            })),
        nameValuePairs: prev.nameValuePairs?.length
          ? prev.nameValuePairs
          : mappedUsers.map((user) => ({
              [user.name]: user.tools,
            })),
      }));
    }

    hasInitializedExisting.current = true;
  }, [existingProject, existingProjectMetadata, setFormData, userList, allTools]);

  useEffect(() => {
    if (existingProject === 'yes') return;
    const selections = formData?.userSelectionsAndToolAcees ?? [];
    if (!selections.length) {
      setAddedUsers([]);
      setExpandedUsers(new Set());
      return;
    }
    setAddedUsers(
      selections.map((entry: any) => {
        const email = entry?.email ?? '';
        const tools = Array.isArray(entry?.toolAccess) ? entry.toolAccess : [];
        return {
          name: findNameByEmail(email, userList) || email,
          email,
          tools,
        };
      })
    );
  }, [existingProject, formData?.userSelectionsAndToolAcees, userList]);

  // Helper to get email suggestions
  const getEmailSuggestions = (input: string) => {
    if (!input) return [];
    // Exclude emails already present in addedUsers
    const addedEmails = new Set(addedUsers.map(u => (u.email || '').toLowerCase()));
    return emailList.filter(
      (email: string) =>
        email.toLowerCase().includes(input.toLowerCase()) &&
        !addedEmails.has(email.toLowerCase())
    );
  };

  // Helper to get name suggestions
  const getNameSuggestions = (input: string) => {
    if (!input) return [];
    const normalizedInput = input.toLowerCase();
    return userList
      .filter(
        (user: any) =>
          typeof user?.name === 'string' && user.name.toLowerCase().includes(normalizedInput)
      )
      .map((user: any) => user.name);
  };

  // Helper function to get tooltip from API information
  const getTooltipText = (informationKey: string): string => {
    const text = data?.result?.information?.[informationKey] || '';
    return text.trim();
  };

  // Approver fields config
  const approverFields = [
    {
      label: 'Primary PMD/Partner',
      field: 'primaryPmdPartner',
      role: 'Partner - Managing Director',
      informationKey: 'managing_director',
      isMultiple: false,
      required: true,
    },
    {
      label: 'Secondary PMD/Partner',
      field: 'secondoryPmdPartner',
      role: 'Secondary Partner Managing Director',
      informationKey: 'secondary_managing_director',
      isMultiple: false,
      required: false,
    },
    {
      label: 'Information Owner',
      field: 'informationOwner',
      role: 'Information Owner',
      informationKey: 'md',
      isMultiple: false,
      required: true,
    },
    {
      label: 'Delegate Information Owner',
      field: 'delegateIformationOwner',
      role: 'Delegate Information Owner',
      informationKey: 'delegated_information_owner',
      isMultiple: false,
      required: false,
    },
    {
      label: 'Project Manager',
      field: 'projectManager',
      role: 'Project Manager',
      informationKey: 'project_manager',
      isMultiple: false,
      required: false,
    },
    {
      label: 'Approvers',
      field: 'approvers',
      role: 'Approvers',
      informationKey: 'approvers',
      isMultiple: true,
      required: false,
    },
  ];

  // Handle user email input change
  const handleUserEmailChange = (value: string) => {
    setUserEmail(value);
    setUserEmailSuggestions(getEmailSuggestions(value));
  };

  // Handle user email suggestion click
  const handleUserEmailSuggestionClick = (email: string) => {
    setUserEmail(email);
    setUserEmailSuggestions([]);
  };

  // suggestions helper for managing directors
  const getMDNameSuggestions = (input: string) => {
    if (!input) return [];
    const list: any[] = data?.result?.managing_director || [];
    return list
      .filter(
        (md) =>
          md?.name?.toLowerCase().includes(input.toLowerCase()) ||
          md?.emailID?.toLowerCase().includes(input.toLowerCase())
      )
      .map((md) => md.name);
  };

  // suggestions helper for secondary managing directors
  const getSecondaryMDNameSuggestions = (input: string) => {
    if (!input) return [];
    const list: any[] = data?.result?.secondary_managing_director || [];
    return list
      .filter(
        (md) =>
          md?.name?.toLowerCase().includes(input.toLowerCase()) ||
          md?.emailID?.toLowerCase().includes(input.toLowerCase())
      )
      .map((md) => md.name);
  };

  // Handle approver input change (for all fields)
  const handleApproverInputChange = (
    role: string,
    field: string,
    value: string,
    isMultiple: boolean
  ) => {
    // determine suggestion source based on role
    const getSuggestions = () => {
      if (role === 'Partner - Managing Director') {
        return getMDNameSuggestions(value);
      }
      if (role === 'Secondary Partner Managing Director') {
        return getSecondaryMDNameSuggestions(value);
      }
      return getNameSuggestions(value);
    };

    if (isMultiple) {
      // Track the search input separately
      setApproverSearchInput((prev) => ({
        ...prev,
        [role]: value,
      }));
      // Show suggestions based on input
      setApproverSuggestions((prev) => ({
        ...prev,
        [role]: getSuggestions(),
      }));
    } else {
      // For single selection
      handleChange(field, value);
      setApproverSuggestions((prev) => ({
        ...prev,
        [role]: getSuggestions(),
      }));
    }
  };

  // Handle approver suggestion click
  const handleApproverSuggestionClick = (
    role: string,
    field: string,
    email: string,
    isMultiple: boolean
  ) => {
    // if (isMultiple) {
    //   // For multiple selections, add to array
    //   const currentApprovers = formData[field] || [];
    //   const updatedApprovers = currentApprovers.includes(email)
    //     ? currentApprovers.filter((e: string) => e !== email)
    //     : [...currentApprovers, email];
    //   handleChange(field, updatedApprovers);
    //   // Clear search input and suggestions after selection
    //   setApproverSearchInput((prev) => ({
    //     ...prev,
    //     [role]: '',
    //   }));
    //   setApproverSuggestions((prev) => ({
    //     ...prev,
    //     [role]: [],
    //   }));
    // } else {

    // For single selection
    handleChange(field, email);
    setApproverSuggestions((prev) => ({
      ...prev,
      [role]: [],
    }));

    // }
  };

  // Remove approver email from multiple selection
  const handleRemoveApprover = (field: string, email: string) => {
    const currentApprovers = formData[field] || [];
    const updatedApprovers = currentApprovers.filter((e: string) => e !== email);
    handleChange(field, updatedApprovers);
  };
  const usersList = data?.result?.users || [];

  // Add user logic
  const handleAddUser = () => {
    const toolsForUser = selected.length ? selected : toolsAccess;
    const toolsForUserDisplay = toolsForUser.map(getToolNameFromSlug);
    const normalizedEmail = userEmail.trim();
    const isEmailAllowed = emailList.some(
      (email: string) => email.toLowerCase() === normalizedEmail.toLowerCase()
    );
    if (!normalizedEmail) return;
    if (!isEmailAllowed) {
      alert('Please select a user email from the list.');
      return;
    }
    if (!toolsForUser.length) {
      alert('Please select at least one tool access.');
      return;
    }

    const derivedName = userEmail
      .split('@')[0]
      .split('.')
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
      .join(' ');
    const displayName = findNameByEmail(normalizedEmail, userList) || derivedName;

    // Update local addedUsers state
    setAddedUsers((s) => [
      ...s,
      { name: displayName, email: normalizedEmail, tools: toolsForUserDisplay },
    ]);

    // Auto-expand the newly added user
    setExpandedUsers((prev) => {
      const newSet = new Set(prev);
      newSet.add(addedUsers.length);
      return newSet;
    });

    setFormData((prev) => ({
      ...prev,
      userSelectionsAndToolAcees: [
        ...prev.userSelectionsAndToolAcees,
        {
          email: normalizedEmail,
          toolAccess: toolsForUserDisplay,
        },
      ],
      nameValuePairs: [
        ...prev.nameValuePairs,
        {
          [displayName]: toolsForUser,
        },
      ],
    }));

    // Reset inputs
    setUserEmail('');
    setToolsAccess([]);
    setUserEmailSuggestions([]);
    setSelected([]);
  };

  const handleClearUserAccess = () => {
    setUserEmail('');
    setToolsAccess([]);
    setSelected([]);
    setUserEmailSuggestions([]);
  };

  // Remove user
  const handleRemoveUser = (index: number) => {
    const removedUser = addedUsers[index];
    setAddedUsers((s) => s.filter((_, i) => i !== index));
    setExpandedUsers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
    if (removedUser?.email) {
      const removedEmail = removedUser.email.toLowerCase();
      const removedName = removedUser.name || findNameByEmail(removedUser.email, userList);
      setFormData((prev: any) => {
        const updatedSelections = (prev.userSelectionsAndToolAcees ?? []).filter(
          (entry: any) => (entry?.email || '').toLowerCase() !== removedEmail
        );
        const updatedPairs = (prev.nameValuePairs ?? []).filter((pair: any) => {
          const key = Object.keys(pair || {})[0];
          return key && key !== removedName;
        });
        return {
          ...prev,
          userSelectionsAndToolAcees: updatedSelections,
          nameValuePairs: updatedPairs,
        };
      });
    }
  };

  // Toggle tool for user
  const handleToolToggle = (userIndex: number, tool: string) => {
    setAddedUsers((users) => {
      const updatedUsers = users.map((user, idx) => {
        if (idx === userIndex) {
          const hasTools = user.tools.includes(tool);
          return {
            ...user,
            tools: hasTools ? user.tools.filter((t) => t !== tool) : [...user.tools, tool],
          };
        }
        return user;
      });

      const updatedUser = updatedUsers[userIndex];
      if (updatedUser) {
        setFormData((prev) => {
          const updatedEmail = (updatedUser.email || '').toLowerCase();
          const updatedName = updatedUser.name || findNameByEmail(updatedUser.email, userList);

          const existingSelections = prev.userSelectionsAndToolAcees ?? [];
          const selectionsUpdated = existingSelections.map((entry: any) =>
            (entry?.email || '').toLowerCase() === updatedEmail
              ? { ...entry, toolAccess: updatedUser.tools }
              : entry
          );
          const hasSelection = selectionsUpdated.some(
            (entry: any) => (entry?.email || '').toLowerCase() === updatedEmail
          );
          const finalSelections = hasSelection
            ? selectionsUpdated
            : [...selectionsUpdated, { email: updatedUser.email, toolAccess: updatedUser.tools }];

          const existingPairs = prev.nameValuePairs ?? [];
          const pairsUpdated = existingPairs.map((pair: any) => {
            const key = Object.keys(pair || {})[0];
            if (key === updatedName) {
              return { [key]: updatedUser.tools };
            }
            return pair;
          });
          const hasPair = pairsUpdated.some(
            (pair: any) => Object.keys(pair || {})[0] === updatedName
          );
          const finalPairs = hasPair
            ? pairsUpdated
            : [...pairsUpdated, { [updatedName]: updatedUser.tools }];

          return {
            ...prev,
            userSelectionsAndToolAcees: finalSelections,
            nameValuePairs: finalPairs,
          };
        });
      }

      return updatedUsers;
    });
  };

  // Toggle user expanded
  const toggleUserExpanded = (index: number) => {
    setExpandedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const AlertIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={svgPaths.p341e8200} fill="#006176" />
    </svg>
  );

  return (
    <>
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-['Roboto',sans-serif] font-bold text-[#28292c] text-lg md:text-[19px]">
              Approvers
            </h2>
            <p className="font-['Roboto',sans-serif] font-medium text-[#727272] text-sm md:text-[15px]">
              {existingProject === 'yes'
                ? 'This request follows the existing approval chain for this ITRF. Approval roles cannot be modified here.'
                : 'Please select who will be approving this Internal Technology Request. Also, provide Information Owner for this ITRF.'}
            </p>
          </div>

          {/* Approver Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {approverFields.map(({ label, field, role, informationKey, isMultiple, required }) => (
              <div className="relative" key={field}>
                {/* Multi-select for isMultiple fields */}
                {isMultiple ? (
                  <>
                    <div className="relative">
                      <label className={`flex items-center gap-1 font-['Roboto',sans-serif] font-medium text-sm relative group ${existingProject === 'yes' && !isDraftProject ? 'text-[#999] opacity-60' : 'text-[#4a4a4a]'}`}>{label}{' '}{required && <span className="text-[#cb282e] ml-1">*</span>}</label>
                      <div
                        className={`w-full h-8 px-2 pr-8 border rounded font-['Roboto',sans-serif] text-sm flex items-center flex-nowrap relative ${existingProject === 'yes' && !isDraftProject ? 'bg-[#f5f5f5] border-[#ccc] text-[#999] opacity-60 cursor-not-allowed overflow-hidden group' : 'border-[#ccc] text-[#4a4a4a] bg-white overflow-x-auto focus-within:ring-2 focus-within:ring-[#498e2b] focus-within:border-transparent'}`}
                        style={{ minHeight: '2rem' }}
                        tabIndex={0}
                        onClick={e => {
                          if (!(existingProject === 'yes' && !isDraftProject)) {
                            // Focus the input when container is clicked
                            const input = document.getElementById(`${field}-approver-multiselect-input`);
                            if (input) (input as HTMLInputElement).focus();
                          }
                        }}
                      >
                        {/* Tooltip for disabled state */}
                        {existingProject === 'yes' && !isDraftProject && (
                          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-3 py-2 whitespace-normal max-w-sm w-max z-50">
                            This field is disabled for existing projects.
                          </span>
                        )}
                        {/* Show selected users as comma-separated, handling string or array */}
                        {(Array.isArray(formData[field])
                          ? formData[field]
                          : typeof formData[field] === 'string'
                            ? formData[field].split(',').map(s => s.trim()).filter(Boolean)
                            : []
                        ).map((val: string, idx: number, arr: string[]) => {
                          const user = userList.find(
                            (u: any) => u.name === val || u.emailID === val
                          );
                          const display = user && user.name && user.emailID
                            ? `${user.name} (${user.emailID})`
                            : val;
                          return (
                            <span key={val} className="inline-block whitespace-nowrap mr-1">
                              {display}{idx < arr.length - 1 ? ', ' : ''}
                            </span>
                          );
                        })}
                        <input
                          id={`${field}-approver-multiselect-input`}
                          type="text"
                          value={approverSearchInput[role] || ''}
                          disabled={existingProject === 'yes' && !isDraftProject}
                          onChange={e => handleApproverInputChange(role, field, e.target.value, isMultiple)}
                          onKeyDown={e => {
                            if (
                              !(
                                existingProject === 'yes' && !isDraftProject
                              ) &&
                              e.key === 'Backspace' &&
                              !(approverSearchInput[role] || '').length
                            ) {
                              // Remove last user if input is empty
                              const current = Array.isArray(formData[field])
                                ? formData[field]
                                : typeof formData[field] === 'string'
                                ? formData[field].split(',').map(s => s.trim()).filter(Boolean)
                                : [];
                              if (current.length > 0) {
                                handleChange(field, current.slice(0, -1));
                              }
                            }
                          }}
                          className="flex-1 min-w-[60px] outline-none border-none bg-transparent"
                          style={{ minWidth: '60px' }}
                        />
                      </div>
                      {/* Suggestions dropdown */}
                      {approverSuggestions[role]?.length > 0 && (
                        <ul className="absolute bg-white border rounded mt-1 z-10 w-full shadow-lg top-full">
                          {approverSuggestions[role].map((val, idx) => {
                            // Try to find the user by name or email
                            const user = userList.find(
                              (u: any) => u.name === val || u.emailID === val
                            );
                            const display = user && user.name && user.emailID
                              ? `${user.name} (${user.emailID})`
                              : val;
                            return (
                              <li
                                key={idx}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => {
                                  const current = formData[field] || [];
                                  if (!current.includes(val)) {
                                    handleChange(field, [...current, val]);
                                  }
                                  setApproverSearchInput((prev) => ({ ...prev, [role]: '' }));
                                  setApproverSuggestions((prev) => ({ ...prev, [role]: [] }));
                                }}
                              >
                                {display}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                    {/* Suggestions dropdown */}
                    {approverSuggestions[role]?.length > 0 && (
                      <ul className="absolute bg-white border rounded mt-1 z-10 w-full shadow-lg top-full">
                        {approverSuggestions[role].map((email, idx) => (
                          <li
                            key={idx}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => {
                              // Add to array if not already present
                              const current = formData[field] || [];
                              if (!current.includes(email)) {
                                handleChange(field, [...current, email]);
                              }
                              // Clear search input and suggestions
                              setApproverSearchInput((prev) => ({ ...prev, [role]: '' }));
                              setApproverSuggestions((prev) => ({ ...prev, [role]: [] }));
                            }}
                          >
                            {email}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <>
                    <SearchInput
                      label={label}
                      required={!!required}
                      value={(() => {
                        const val = formData[field];
                        if (typeof val === 'string' && val) {
                          const user = userList.find(
                            (u: any) => u.name === val || u.emailID === val
                          );
                          if (user && user.name && user.emailID) {
                            return `${user.name} (${user.emailID})`;
                          }
                        }
                        return val;
                      })()}
                      onChange={(val) => handleApproverInputChange(role, field, val, isMultiple)}
                      tooltip={getTooltipText(informationKey)}
                      disabled={existingProject === 'yes' && !isDraftProject}
                    />
                    {approverSuggestions[role]?.length > 0 && (
                      <ul className="absolute bg-white border rounded mt-1 z-10 w-full shadow-lg top-full">
                        {approverSuggestions[role].map((email, idx) => (
                          <li
                            key={idx}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() =>
                              handleApproverSuggestionClick(role, field, email, isMultiple)
                            }
                          >
                            {email}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 md:p-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-['Roboto',sans-serif] font-bold text-[#4a4a4a] text-base md:text-[17px]">
              {existingProject === 'yes' ? 'Existing Users' : 'User Access'}
            </h2>
            <p className="font-['Roboto',sans-serif] font-medium text-[#727272] text-sm md:text-[15px]">
              {existingProject === 'yes'
                ? 'Add users and grant access to tools for this project.'
                : 'Add required users, choose the tools they need, and assign their roles.'}
            </p>
            {existingProject === 'yes' && initialExistingUsersCount.current > 0 && (
              <div className="info-alert" style={{ marginTop: '-8px' }}>
                <AlertIcon />
                <span>
                  {initialExistingUsersCount.current} user
                  {initialExistingUsersCount.current === 1 ? '' : 's'} already has access to this
                  project. You may add new users or grant additional tool access.
                </span>
              </div>
            )}
            {existingProject === 'yes' && (
              <h2 className="font-['Roboto',sans-serif] font-bold text-[#4a4a4a] text-base md:text-[17px]">
                Add User
              </h2>
            )}
            <div className="border border-[#8dca7e] rounded-lg p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* User Email Input */}
                <div className="lg:col-span-1 relative">
                  <SearchInput
                    label="User Email ID"
                    value={userEmail}
                    required
                    onChange={handleUserEmailChange}
                  />
                  {/* Suggestions Dropdown */}
                  {userEmailSuggestions.length > 0 && (
                    <ul className="absolute bg-white border rounded mt-1 z-10 w-full shadow-lg">
                      {userEmailSuggestions.map((email, idx) => {
                        const user = userList.find((u: any) => u.emailID === email);
                        const display = user && user.name && user.emailID
                          ? `${user.name} (${user.emailID})`
                          : email;
                        return (
                          <li
                            key={idx}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleUserEmailSuggestionClick(email)}
                          >
                            {display}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {/* Tools Access Dropdown */}
                <div className="lg:col-span-1">
                  <Dropdown
                    label="Tools Access"
                    value={toolsAccess}
                    required
                    hasInfo
                    onChange={setToolsAccess}
                    selected={selected}
                    setSelected={setSelected}
                    options={toolOptions}
                  />
                </div>

                {/* New Field for Client Engagement Only */}
                {(() => { console.log('existingProject:', existingProject, 'projectType:', formData?.projectType); return null; })()}
                {existingProject !== 'yes' && formData?.requestType === 'ETRF' && (
                  <div className="lg:col-span-1">
                    <Dropdown
                      label="User Role"
                      value={toolsAccess}
                      required
                      hasInfo
                      onChange={setToolsAccess}
                      selected={selected}
                      setSelected={setSelected}
                      options={[]}
                    />
                  </div>
                )}

                {/* Buttons */}
                <div className="lg:col-span-3 flex items-end justify-end gap-4">
                  <Buttons variant="secondary" onClick={handleClearUserAccess}>
                    Clear
                  </Buttons>
                  <Buttons variant="primary" onClick={handleAddUser}>
                    Add
                  </Buttons>
                </div>
              </div>
            </div>

            {/* Added Users Section */}
            {addedUsers.length > 0 && (
              <div className="space-y-4">
                {addedUsers.map((user, index) => (
                  <div key={index} className="border border-[#e0e0e0] rounded-lg">
                    {/* User Header */}
                    <div className="flex items-center justify-between p-4">
                      <div className="flex justify-between gap-4 mr-8 flex-1 flex-wrap">
                        <h4 className="font-['Roboto',sans-serif] font-bold text-[#4a4a4a] text-base">
                          {user.name}
                        </h4>
                        <p className="font-['Roboto',sans-serif] text-[#727272] text-sm">
                          {user.email}
                        </p>
                        <span className="px-3 py-1 bg-[#F1F1F1] text-[#727272] rounded-full text-xs font-medium whitespace-nowrap">
                          Limited Access ({user.tools.length} Tool
                          {user.tools.length !== 1 ? 's' : ''})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRemoveUser(index)}
                          disabled={
                            existingProject === 'yes' &&
                            existingUserNameSet.has(user.name) &&
                            !isDraftProject
                          }
                          className={`text-[#d32f2f] px-3 py-1 rounded font-['Roboto',sans-serif] text-sm font-medium flex items-center gap-1 whitespace-nowrap ${
                            existingProject === 'yes' &&
                            existingUserNameSet.has(user.name) &&
                            !isDraftProject
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-[#ffebee]'
                          }`}
                        >
                          <span className="text-lg leading-none">✕</span> Remove
                        </button>
                        <button
                          onClick={() => toggleUserExpanded(index)}
                          className="text-[#727272] hover:bg-gray-100 p-2 rounded"
                        >
                          <svg
                            className={`w-5 h-5 transition-transform ${expandedUsers.has(index) ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Expandable Tools Section */}
                    {expandedUsers.has(index) && (
                      <div className="px-4 pb-4 border-t border-[#e0e0e0]">
                        <div className="pt-4">
                          <h5 className="font-['Roboto',sans-serif] font-bold text-[#4a4a4a] text-sm mb-3">
                            Tools
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {selectedToolNames.map((tool) => (
                              <label key={tool} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={user.tools.includes(tool)}
                                  onChange={() => handleToolToggle(index, tool)}
                                  className="peer hidden"
                                />
                                <span
                                  className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded 
                                  peer-checked:bg-[#4caf50] peer-checked:before:content-['✔'] 
                                  peer-checked:before:text-white peer-checked:before:text-sm"
                                ></span>
                                <span className="font-['Roboto',sans-serif] text-[#4a4a4a] text-sm">
                                  {tool}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
