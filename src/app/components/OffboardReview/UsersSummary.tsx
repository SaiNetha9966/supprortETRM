import svgPaths from '../../../imports/svg-0ywn1y5h0h';

interface UserCardProps {
  name: string;
  email: string;
  access: string;
  status: 'offboarded' | 'no-change';
}

interface UsersSummaryProps {
  selectOffboadingScope: string;
}

function UserCard({ name, email, access, status }: UserCardProps) {
  return (
    <div className="border border-[#ccc] rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
          <p className="font-medium text-[15px] text-[#4a4a4a] sm:w-[200px]">{name}</p>
          <p className="font-normal text-[14px] text-[#4a4a4a] sm:w-[220px]">{email}</p>
          <div className="bg-[#f1f1f1] border border-[#ccc] rounded-full px-2.5 h-6 flex items-center">
            <span className="font-normal text-[14px] text-[#727272] leading-[19px]">{access}</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          {status === 'offboarded' ? (
            <div className="bg-[#ffebed] border border-[#f1b5b7] rounded-full px-2.5 h-6 flex items-center">
              <span className="font-normal text-[13px] text-[#bf494e] leading-none">
                User will be offboarded
              </span>
            </div>
          ) : (
            <div className="bg-[#e0eaff] border border-[#9bb5fd] rounded-full px-2.5 h-6 flex items-center">
              <span className="font-normal text-[12px] text-[#024870] leading-none">No Change</span>
            </div>
          )}
          <div className="w-6 h-6 relative shrink-0">
            <div
              className="absolute"
              style={{
                aspectRatio: '12.00000286102295/7.409999847412109',
                bottom: '29.17%',
                left: '50%',
                top: '33.33%',
                transform: 'translateX(-50%)',
              }}
            >
              <svg
                className="absolute block inset-0"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 14 9"
              >
                <path d={svgPaths.p302c3f80} fill="#4A4A4A" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const UsersSummary: React.FC<UsersSummaryProps> = ({ selectOffboadingScope }) => {
  return (
    <section className="bg-white rounded-lg p-6 mb-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            {selectOffboadingScope === 'project' && (
              <h2 className="font-bold text-[19px] text-[#4a4a4a]">
                Users Losing Access to this Project (All users)
              </h2>
            )}
            {selectOffboadingScope === 'tools' && (
              <h2 className="font-bold text-[19px] text-[#4a4a4a]">
                Users Losing Access to Selected Tools
              </h2>
            )}
            {selectOffboadingScope === 'users' && (
              <h2 className="font-bold text-[19px] text-[#4a4a4a]">Users Impact Summary</h2>
            )}
            {selectOffboadingScope === 'users' && (
              <button className="flex items-center gap-0.5 h-5 text-[#4a4a4a] hover:text-[#333] transition-colors">
                <div className="w-5 h-5 relative">
                  <div className="absolute inset-[12.62%_12.62%_12.5%_12.5%]">
                    <svg
                      className="absolute block inset-0"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 14.9757 14.9757"
                    >
                      <path d={svgPaths.p42c2a80} fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <span className="font-medium text-[13px] tracking-[0.26px]">Edit</span>
              </button>
            )}
          </div>
          {selectOffboadingScope === 'users' && (
            <div className="bg-[#f6fdff] border border-[#b0deeb] rounded-lg p-3">
              <div className="flex gap-1.5">
                <div className="w-5 h-5 relative shrink-0">
                  <div className="absolute inset-[8.33%]">
                    <svg
                      className="absolute block inset-0"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 16.6667 16.6667"
                    >
                      <path d={svgPaths.p36290900} fill="#006176" />
                    </svg>
                  </div>
                </div>
                <p className="font-normal text-[14px] text-[#3b4648] leading-[19px]">
                  Selected users will lose access to this project. Project tools and data will
                  remain unchanged.
                </p>
              </div>
            </div>
          )}

          {selectOffboadingScope === 'tools' && (
            <div className="bg-[#f6fdff] border border-[#b0deeb] rounded-lg p-3">
              <div className="flex gap-1.5">
                <div className="w-5 h-5 relative shrink-0">
                  <div className="absolute inset-[8.33%]">
                    <svg
                      className="absolute block inset-0"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 16.6667 16.6667"
                    >
                      <path d={svgPaths.p36290900} fill="#006176" />
                    </svg>
                  </div>
                </div>
                <p className="font-normal text-[14px] text-[#3b4648] leading-[19px]">
                  These users currently have access to the selected tools and will lose access only
                  to those tools after approval.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <UserCard
            name="Devraj Patel"
            email="devraj.patel@company.com"
            access="Full Access (3 Tools)"
            status="offboarded"
          />
          <UserCard
            name="Marcus Holloway"
            email="marcus.holloway@company.com"
            access="Full Access (3 Tools)"
            status="no-change"
          />
          <UserCard
            name="Javier Ramirez"
            email="javier.ramirez@email.com"
            access="Limited Access (2 Tools)"
            status="no-change"
          />
        </div>
      </div>
    </section>
  );
};
