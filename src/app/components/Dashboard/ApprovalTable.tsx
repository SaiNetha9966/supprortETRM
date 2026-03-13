import { useState, useMemo } from 'react';
import { ApprovalRequest, FilterStatus } from './Types/index';
import { StatusBadge } from './StatusBadge';
import { ApprovalCard } from './ApprovalCard';
import svgPaths from '../../../imports/svg-w3qi05nelx';

interface ApprovalTableProps {
  requests: ApprovalRequest[];
}

type SortField = keyof ApprovalRequest | null;
type SortOrder = 'asc' | 'desc';

export function ApprovalTable({ requests }: ApprovalTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [activeTab, setActiveTab] = useState<'ALL' | 'ETRF' | 'ITRF'>('ALL');
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: keyof ApprovalRequest) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIndicator = (field: keyof ApprovalRequest) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  const filteredRequests = useMemo(() => {
    let filtered = requests.filter((request) => {
      const matchesSearch =
        searchQuery === '' ||
        Object.values(request).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesStatus =
        filterStatus === 'all' || request.requestStatus === filterStatus;
      return matchesSearch && matchesStatus;
    });

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = String(a[sortField]);
        const bValue = String(b[sortField]);

        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

    return filtered;
  }, [requests, searchQuery, filterStatus, sortField, sortOrder]);

  return (
    <div className="bg-white rounded-lg p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#4a4a4a] mb-4">
          My Approvals
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#ccc]">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-4 py-2 font-['Roboto',sans-serif] text-sm transition-colors relative ${
              activeTab === 'ALL'
                ? 'text-[#3f7b25] font-medium'
                : 'text-[#727272] font-normal'
            }`}
          >
            ALL
            {activeTab === 'ALL' && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5cb335]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('ETRF')}
            className={`px-4 py-2 font-['Roboto',sans-serif] text-sm transition-colors ${
              activeTab === 'ETRF'
                ? 'text-[#3f7b25] font-medium'
                : 'text-[#727272] font-normal'
            }`}
          >
            ETRF (5)
          </button>
          <button
            onClick={() => setActiveTab('ITRF')}
            className={`px-4 py-2 font-['Roboto',sans-serif] text-sm transition-colors ${
              activeTab === 'ITRF'
                ? 'text-[#3f7b25] font-medium'
                : 'text-[#727272] font-normal'
            }`}
          >
            ITRF (2)
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-6 mb-4">
          <div className="flex-1 max-w-[530px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 px-2 py-1.5 pr-10 border border-[#ccc] rounded font-['Roboto',sans-serif] text-sm text-[#4a4a4a] placeholder:text-[#878787] focus:outline-none focus:border-[#5cb335]"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 size-5">
                <div className="absolute inset-[8.33%_7.03%_7.03%_8.33%]">
                  <svg
                    className="absolute block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 16.9283 16.9283"
                  >
                    <path d={svgPaths.p1df1880} fill="#4A4A4A" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-[182px]">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                className="w-full h-8 px-2 py-1.5 pr-8 border border-[#ccc] rounded font-['Roboto',sans-serif] text-sm text-[#4a4a4a] appearance-none focus:outline-none focus:border-[#5cb335] bg-white"
              >
                <option value="all">All Status</option>
                <option value="Onboarding - Awaiting Response">
                  Awaiting Response
                </option>
                <option value="Onboarding - Pending Approval">
                  Pending Approval
                </option>
                <option value="Onboarding - Approved">Approved</option>
                <option value="Onboarding - In Progress">In Progress</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 size-4 pointer-events-none">
                <div className="absolute bottom-[29.17%] left-1/2 top-[33.33%] -translate-x-1/2 aspect-[12/7.41]">
                  <svg
                    className="absolute block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 9.57826 5.91457"
                  >
                    <path d={svgPaths.pa14dd00} fill="#4A4A4A" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="hidden lg:block overflow-x-auto -mx-6 px-6">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full border border-[#ccc] rounded-lg overflow-hidden">
            <thead className="bg-white">
              <tr>
                <th
                  className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort('projectCodeName')}
                >
                  Project Code Name {getSortIndicator('projectCodeName')}
                </th>
                <th
                  className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort('clientName')}
                >
                  Client Name {getSortIndicator('clientName')}
                </th>
                <th
                  className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort('typeOfWork')}
                >
                  Type of work {getSortIndicator('typeOfWork')}
                </th>
                <th
                  className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort('ironcladId')}
                >
                  Ironclad ID {getSortIndicator('ironcladId')}
                </th>
                <th
                  className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort('radiusId')}
                >
                  Radius ID {getSortIndicator('radiusId')}
                </th>
                <th
                  className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort('sapProjectId')}
                >
                  SAP Project ID {getSortIndicator('sapProjectId')}
                </th>
                <th
                  className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort('requestor')}
                >
                  Requestor {getSortIndicator('requestor')}
                </th>
                <th
                  className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap cursor-pointer"
                  onClick={() => handleSort('submittedDate')}
                >
                  Submitted Date {getSortIndicator('submittedDate')}
                </th>
                <th className="px-4 py-3 text-left border-b border-[#ccc] font-['Roboto',sans-serif] font-bold text-[13px] text-[#181d1f] whitespace-nowrap">
                  Request Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <tr
                  key={request.id}
                  className={`transition-colors hover:bg-[#e8f5e9] ${
                    index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'
                  }`}
                >
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] font-medium text-sm text-[#0369a3] underline whitespace-nowrap">
                    <a href="#" className="hover:text-[#024870]">
                      {request.projectCodeName}
                    </a>
                  </td>
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.clientName}
                  </td>
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.typeOfWork}
                  </td>
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.ironcladId}
                  </td>
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.radiusId}
                  </td>
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.sapProjectId}
                  </td>
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.requestor}
                  </td>
                  <td className="px-4 py-2.5 font-['Roboto',sans-serif] text-sm text-[#181d1f] whitespace-nowrap">
                    {request.submittedDate}
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusBadge status={request.requestStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredRequests.map((request) => (
          <ApprovalCard key={request.id} request={request} />
        ))}
      </div>

      {/* Results count */}
      {filteredRequests.length === 0 && (
        <div className="text-center py-8">
          <p className="font-['Roboto',sans-serif] text-sm text-[#727272]">
            No results found
          </p>
        </div>
      )}
    </div>
  );
}