 const getOrdinal = (n: number): string => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return 'th';
  switch (n % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const formatDate = (isoDate: string): string => {
  if (!isoDate) return '';
  const d = new Date(isoDate + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return '';
  const month = d.toLocaleString('default', { month: 'long' });
  const day = d.getDate();
  const year = d.getFullYear();
  const ordinal = getOrdinal(day);
  return `${month} ${day}${ordinal}, ${year}`;
};

export const calculateProgress = (formData: any,): number => {
 const allFields: string[] = [
    'sapProjectId',
    'projectCodeName',
    'projectType',
    'estimatedStartDate',
    'estimatedEndDate',
    'description',
    'selectedTools',
    'customToolRequest',
    'primaryPmdPartner',
    'secondoryPmdPartner',
    'informationOwner',
    'delegateIformationOwner',
    'projectManaeger',
    'approvers',
    'confirmation',
  ];

  const filled = allFields.filter((field) => {
    const value = formData[field];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'boolean') return value === true;
    return value !== '' && value !== null && value !== undefined;
  });

  return Math.round((filled.length / allFields.length) * 100);

}

   export const findNameByEmail = (email: string , userList: any[]) => {
    if (!email) return '';
    const e = email.trim();
    const user = userList.find((u: any) => (u.emailID || '').toLowerCase() === e.toLowerCase());
    return user?.name || email;
  };


export const mapFormDataToApiPayload = (formData: any) => {
  const normalizeToolsArray = (input: any): string[] => {
    let value = input;
    for (let i = 0; i < 3; i += 1) {
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
          try {
            value = JSON.parse(trimmed);
            continue;
          } catch {
            break;
          }
        }
      }
      break;
    }

    const arrayValue = Array.isArray(value) ? value.flat(Infinity) : [value];
    return arrayValue
      .map((item) => (item == null ? '' : String(item).trim()))
      .filter(Boolean);
  };

  const normalizeNameValuePairs = (pairs: any[]): any[] => {
    if (!Array.isArray(pairs)) return [];
    return pairs
      .map((pair) => {
        const [name, tools] = Object.entries(pair || {})[0] ?? [];
        if (!name) return null;
        return { [name]: normalizeToolsArray(tools) };
      })
      .filter(Boolean) as any[];
  };

  return {
    number: formData.number,
    sap_project_id: formData.sapProjectId,
    codename: formData.projectCodeName,
    what_type_of_project: formData.projectType,
    estimated_start_date: formatDate(formData.estimatedStartDate),
    estimated_end_date: formatDate(formData.estimatedEndDate),
    are_you_planning_to_use_any_personal_or_protected_data: formData.personalOrprotectedData,
    please_describe: formData.description,
    requested_by: "Navneet Agarwal",
    tools: formData.selectedTools.map((tool: any) => ({
      tool_id: tool.ToolId ?? tool.toolId ?? tool.id,
      trust_external_domain: tool.trustExternalDomain || "",
      external_domain_name: tool.externalDomainName || "",
    })),
    custom_tool_request: formData.customToolRequest,
    managing_director: formData.primaryPmdPartner,
    secondary_managing_director: formData.secondoryPmdPartner,
    md: formData.informationOwner,
    delegated_information_owner: formData.delegateIformationOwner,
    project_manager: formData.projectManager,
    approvers: Array.isArray(formData.approvers) ? formData.approvers : [formData.approvers],
    namevalue: normalizeNameValuePairs(formData.nameValuePairs),
    memo_to_approving_md: formData.memoToApprovainMd,
    confirmation: formData.confirmation ? "yes" : "no",
  };
}
