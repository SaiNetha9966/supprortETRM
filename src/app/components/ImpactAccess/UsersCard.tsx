import { useState } from "react";
import svgPaths from "../../../imports/svg-ncq7ewl48m";

interface User {
  id: number;
  name: string;
  email: string;
  accessLevel: string;
  toolCount: number;
  status: string | null;
  tools: string[];
  selected: boolean;
}

interface UserCardProps {
  selectOffboadingScope:  string;
  userCardDetails: Record<string, string[]>;
}

export const UsersCard: React.FC<UserCardProps> = ({
  selectOffboadingScope,
  userCardDetails,
}) => {
  const initialUsers: User[] = Object.entries(userCardDetails).map(
    ([name, tools], index) => {
      const uniqueTools = [...new Set(tools)];
      return {
        id: index + 1,
        name,
        email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        tools: uniqueTools,
        toolCount: uniqueTools.length,
        accessLevel: uniqueTools.length > 2 ? "Full Access" : "Limited Access",
        status: "Will be offboarded",
        selected: false,
      };
    }
  );

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  const toggleUser = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, selected: !user.selected } : user
      )
    );
  };

  const toggleExpand = (userId: number) => {
    setExpandedUserId((prevId) => (prevId === userId ? null : userId));
  };

  const renderHeader = () => {
    switch (selectOffboadingScope) {
      case "users":
        return (
          <>
            <h2 className="text-[#4a4a4a] text-[19px] font-bold">
              User Access to Tools
            </h2>
            <p className="text-[#727272] text-[16px]">
              Expand the appropriate user and select the tool(s) they should be
              removed from.
            </p>
          </>
        );
      case "project":
        return (
          <>
            <h2 className="text-[#4a4a4a] text-[19px] font-bold">
              Users Impacted
            </h2>
            <p className="text-[#727272] text-[16px]">
              All users listed below will lose access to this project and its
              tools after approval.
            </p>
          </>
        );
      case "tools":
        return (
          <>
            <h2 className="text-[#4a4a4a] text-[19px] font-bold">
              User Impact Summary
            </h2>
            <p className="text-[#727272] text-[16px]">
              User access changes shown below will take effect after approval
              and execution.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm mt-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">{renderHeader()}</div>

        <div className="flex flex-col gap-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg overflow-hidden bg-[#F7F7F7]"
              style={{ borderRadius: "8px", border: "1px solid #CCC" }}
            >
              {/* User Row */}
              <div className="p-4 flex items-center gap-6 bg-white">
                {/* Checkbox */}
                {selectOffboadingScope === "users" && (
                  <button
                    onClick={() => toggleUser(user.id)}
                    className="flex-shrink-0"
                    aria-label={`Select ${user.name}`}
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        user.selected
                          ? "bg-[#498e2b] border-[#498e2b]"
                          : "bg-white border-[#878787]"
                      }`}
                    >
                      {user.selected && (
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 12 8.66667"
                        >
                          <path d={svgPaths.p3f4c0e80} fill="white" />
                        </svg>
                      )}
                    </div>
                  </button>
                )}

                {/* Name */}
                <span className="text-[#28292c] text-[15px] font-medium truncate min-w-[150px]">
                  {user.name}
                </span>

                {/* Email */}
                <span className="text-[#727272] text-[13px] truncate min-w-[200px]">
                  {user.email}
                </span>

                {/* Access Level */}
                <span className="text-[#727272] text-[13px] bg-[#f7f7f7] px-4 py-1 rounded-full border border-[#ccc] whitespace-nowrap">
                  {selectOffboadingScope === "users"
                    ? `${user.toolCount} Tools`
                    : `${user.accessLevel} (${user.toolCount} Tools)`}
                </span>

                {/* Status */}
                {selectOffboadingScope !== "users" && user.status && (
                  <span
                    className="text-[#BF494E] text-[13px] bg-[#ffebee] px-4 py-1 whitespace-nowrap"
                    style={{
                      borderRadius: "240px",
                      border: "1px solid #F1B5B7",
                    }}
                  >
                    {user.status}
                  </span>
                )}

                {/* Expand Button */}
                <button
                  onClick={() => toggleExpand(user.id)}
                  className="ml-auto flex-shrink-0 w-6 h-6 flex items-center justify-center"
                  aria-label={expandedUserId === user.id ? "Collapse" : "Expand"}
                >
                  <svg
                    className={`w-3 h-4 transition-transform ${
                      expandedUserId === user.id ? "rotate-180" : ""
                    }`}
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
                    <span className="text-[#4a4a4a] text-[14px] font-medium">
                      Tools
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {user.tools.map((tool, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-[#498e2b] text-[14px]"
                        >
                          <div className="w-4 h-4 flex-shrink-0">
                            <svg
                              className="w-full h-full"
                              fill="none"
                              viewBox="0 0 12 8.66667"
                            >
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