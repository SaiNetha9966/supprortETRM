import svgPaths from '../../../imports/svg-ncq7ewl48m';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  accessLevel: string;
  toolCount: number;
  status: string;
  tools: string[];
  selected: boolean;
}

interface UserCardProps {
  selectOffboadingScope: string;
}
export const UsersCard: React.FC<UserCardProps> = ({ selectOffboadingScope }) => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Devraj Patel',
      email: 'devraj.patel@company.com',
      accessLevel: 'Full Access',
      toolCount: 3,
      status: 'User will be offboarded',
      tools: ['Teams Site', 'Tool Builder', 'Company Health Check'],
      selected: true,
    },
    {
      id: 2,
      name: 'Marcus Holloway',
      email: 'marcus.holloway@company.com',
      accessLevel: 'Full Access',
      toolCount: 3,
      status: 'User will be offboarded',
      tools: ['Teams Site', 'Tool Builder', 'Company Health Check'],
      selected: false,
    },
    {
      id: 3,
      name: 'Javier Ramirez',
      email: 'javier.ramirez@email.com',
      accessLevel: 'Limited Access',
      toolCount: 2,
      status: 'User will be offboarded',
      tools: ['Teams Site', 'Tool Builder'],
      selected: false,
    },
  ]);

  const [expandedUserId, setExpandedUserId] = useState<number | null>(1);

  const toggleUser = (userId: number) => {
    setUsers(
      users.map((user) => (user.id === userId ? { ...user, selected: !user.selected } : user))
    );
  };

  const toggleExpand = (userId: number) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm" style={{ marginTop: '20px' }}>
      <div className="flex flex-col gap-4">
        {selectOffboadingScope === 'users' && (
          <div className="flex flex-col gap-2">
            <h2 className="text-[#4a4a4a] text-[19px] font-bold font-['Roboto',sans-serif]">
              Users Losing Project Access
            </h2>
            <p className="text-[#727272] text-[16px] font-normal font-['Roboto',sans-serif]">
              Selected users will lose access to this project.
            </p>
          </div>
        )}

        {selectOffboadingScope === 'project' && (
          <div className="flex flex-col gap-2">
            <h2 className="text-[#4a4a4a] text-[19px] font-bold font-['Roboto',sans-serif]">
              Users Impacted
            </h2>
            <p className="text-[#727272] text-[16px] font-normal font-['Roboto',sans-serif]">
              All users listed below will lose access to this project and its tools after approval.
            </p>
          </div>
        )}

         {selectOffboadingScope === 'tools' && (
          <div className="flex flex-col gap-2">
            <h2 className="text-[#4a4a4a] text-[19px] font-bold font-['Roboto',sans-serif]">
              User Impact Summary
            </h2>
            <p className="text-[#727272] text-[16px] font-normal font-['Roboto',sans-serif]">
              User access changes shown below will take effect after approval and execution.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg overflow-hidden"
              style={{ borderRadius: '8px', border: '1px solid #CCC', background: '#F7F7F7' }}
            >
              {/* User Row */}
              <div className="p-4 flex items-center gap-4 bg-white">
                {/* Checkbox */}
                {selectOffboadingScope === 'users' && (
                  <button
                    onClick={() => toggleUser(user.id)}
                    className="flex-shrink-0"
                    aria-label={`Select ${user.name}`}
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        user.selected
                          ? 'bg-[#498e2b] border-[#498e2b]'
                          : 'bg-white border-[#878787]'
                      }`}
                    >
                      {user.selected && (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 12 8.66667">
                          <path d={svgPaths.p3f4c0e80} fill="white" />
                        </svg>
                      )}
                    </div>
                  </button>
                )}

                {/* Name + Email */}
                <div className="flex flex-col min-w-[200px]">
                  <span className="text-[#28292c] text-[15px] font-medium font-['Roboto',sans-serif] truncate">
                    {user.name}
                  </span>
                </div>

                <div className="flex flex-col min-w-[200px]">
                  <span className="text-[#727272] text-[13px] font-normal font-['Roboto',sans-serif] truncate">
                    {user.email}
                  </span>
                </div>

                {/* Access + Status */}
                <div className="flex items-center gap-2 flex-wrap min-w-[180px]">
                  <span
                    className="text-[#727272] text-[13px] font-normal font-['Roboto',sans-serif] 
                  bg-[#f7f7f7] px-4 py-1 rounded-full 
                  border border-[#ccc] whitespace-nowrap"
                  >
                    {user.accessLevel} ({user.toolCount} Tools)
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap min-w-[180px]">
                  {user.status && (
                    <span
                      className="text-[#BF494E] text-[13px] font-normal font-['Roboto',sans-serif] 
                 bg-[#ffebee] px-4 py-1 whitespace-nowrap"
                      style={{
                        borderRadius: 'var(--tag-container-radius-all, 240px)',
                        border:
                          'var(--tag-border-size-all, 1px) solid var(--tag-border-color-error, #F1B5B7)',
                      }}
                    >
                      {user.status}
                    </span>
                  )}
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => toggleExpand(user.id)}
                  className="ml-auto flex-shrink-0 w-6 h-6 flex items-center justify-center"
                  aria-label={expandedUserId === user.id ? 'Collapse' : 'Expand'}
                >
                  <svg
                    className={`w-3 h-4 transition-transform ${expandedUserId === user.id ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 14 9"
                  >
                    <path d={svgPaths.p302c3f80} fill="#4a4a4a" />
                  </svg>
                </button>
              </div>

              {/* Expanded Content */}
              {expandedUserId === user.id && (
                <div className="bg-[#fafafa] p-4 border-t border-[#e0e0e0]">
                  <div className="flex flex-col gap-3">
                    <span className="text-[#4a4a4a] text-[14px] font-medium font-['Roboto',sans-serif]">
                      Tools
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {user.tools.map((tool, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-[#498e2b] text-[14px] font-normal font-['Roboto',sans-serif]"
                        >
                          <div className="w-4 h-4 flex-shrink-0">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 12 8.66667">
                              <path d={svgPaths.p3f4c0e80} fill="#498e2b" />
                            </svg>
                          </div>
                          <span>{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
