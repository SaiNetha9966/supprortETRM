import { useState } from 'react';
import { DetailedRequest, RequestedUser } from '../Data/mockData';
import svgPaths from '../../../../imports/svg-9v12l09gyw';

interface RequestedUsersSectionProps {
  request: DetailedRequest;
}

function UserCard({ user, onToggle }: { user: RequestedUser; onToggle: () => void }) {
  return (
    <div className="rounded-[8px] border border-[#ccc]">
      <div className="p-4">
        {/* User Info Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ccc]">
          <div className="flex items-center gap-40 flex-1 min-w-0">
            <div className="space-y-1 min-w-0">
              <p className="font-['Roboto',sans-serif] font-medium text-[15px] text-[#4a4a4a] truncate">
                {user.name}
              </p>
              <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a] leading-[19px]">
                {user.role}
              </p>
            </div>

            <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a] hidden sm:block truncate">
              {user.email}
            </p>

            <div className="bg-[#f1f1f1] flex h-[24px] items-center px-[9px] rounded-[240px] border border-[#ccc] shrink-0">
              <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#727272] leading-[19px] whitespace-nowrap">
                {user.toolCount} Tool
                {user.toolCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={onToggle}
            className="ml-4 flex items-center justify-center size-[24px] hover:bg-[#f7f7f7] rounded transition-colors shrink-0"
          >
            <div
              className={`overflow-clip relative size-[24px] transition-transform ${user.isExpanded ? '' : 'rotate-180'}`}
            >
              <div className="absolute aspect-[12/7.41] bottom-[29.17%] left-1/2 top-[33.33%] -translate-x-1/2">
                <svg
                  className="absolute block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 14 9"
                >
                  <path d={svgPaths.p26b39100} fill="#4A4A4A" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Email on mobile */}
        <div className="sm:hidden mt-3 pb-3 border-b border-[#ccc]">
          <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#4a4a4a]">
            {user.email}
          </p>
        </div>

        {/* Expanded Content - Selected Tools */}
        {user.isExpanded && (
          <div className="pt-4 space-y-4">
            <p className="font-['Roboto',sans-serif] font-bold text-[15px] text-[#4a4a4a]">
              Select Tools
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.tools.map((tool, index) => (
                <div key={index} className="flex items-center gap-2">
                  {/* Checkbox */}
                  <div className="bg-[#8dca7e] flex items-center justify-center rounded-[2px] size-[16px] shrink-0">
                    <div className="overflow-clip relative size-[14px]">
                      <div className="absolute bottom-1/4 left-[16.67%] right-[8.33%] top-[20.83%]">
                        <svg
                          className="absolute block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 10.5 7.58333"
                        >
                          <path d={svgPaths.p998df00} fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Tool Name */}
                  <p className="font-['Roboto',sans-serif] font-normal text-[14px] text-[#b2b2b2] leading-none">
                    {tool}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function RequestedUsersSection({ request }: RequestedUsersSectionProps) {
  const [users, setUsers] = useState<RequestedUser[]>(request.requestedUsers);

  const toggleUser = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isExpanded: !user.isExpanded } : user
      )
    );
  };

  return (
    <div className="bg-white rounded-[8px] p-4 sm:p-6">
      <h2 className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#4a4a4a] mb-6 sm:mb-8">
        Requested Users
      </h2>

      <div className="space-y-5">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onToggle={() => toggleUser(user.id)} />
        ))}
      </div>
    </div>
  );
}
