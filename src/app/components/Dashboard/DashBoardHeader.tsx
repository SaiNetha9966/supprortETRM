// import svgPaths from '../../imports/svg-w3qi05nelx';
import svgPaths from "../../../imports/svg-w3qi05nelx"

export function DashBoardHeader() {
  return (
    <header className="bg-[#333] h-12 flex items-center justify-between px-5 w-full">
      <div className="flex gap-3 h-6 items-center">
        {/* Brand Icon */}
        <div className="relative size-6">
          <div className="absolute inset-[4.17%_12.5%_8.33%_12.5%]">
            <svg
              className="absolute block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 18 21"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.p1b0e5100}
                fill="white"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div className="h-full relative w-0">
          <div className="absolute inset-[0_-1px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 2 24"
            >
              <path d="M1 0V24" stroke="#5CB335" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-['Roboto',sans-serif] font-medium leading-[13px] text-lg text-white tracking-wider whitespace-nowrap hidden md:block">
          Technology Request Management Portal
        </h1>
        <h1 className="font-['Roboto',sans-serif] font-medium text-sm text-white tracking-wider md:hidden">
          TRM Portal
        </h1>
      </div>

      <div className="flex gap-6 items-center">
        {/* Navigation Items */}
        <div className="hidden md:flex gap-5 items-start">
          <div className="flex h-12 items-center justify-center py-4 relative border-b-3 border-[#5cb335]">
            <p className="font-['Roboto',sans-serif] font-medium leading-none text-[15px] text-center text-white whitespace-nowrap">
              Dashboard
            </p>
          </div>
          <div className="flex gap-1 items-center justify-center py-4">
            <p className="font-['Roboto',sans-serif] font-medium leading-none text-[15px] text-center text-white whitespace-nowrap">
              New Request
            </p>
            <div className="overflow-clip relative size-4">
              <div className="absolute bottom-[29.17%] left-1/2 top-[33.33%] -translate-x-1/2 aspect-[12/7.41]">
                <svg
                  className="absolute block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 9.7166 6"
                >
                  <path d={svgPaths.p22e4ca80} fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block bg-[#727272] h-[26px] w-[2px]" />

        {/* Icons */}
        <div className="flex gap-3 md:gap-5 items-center">
          {/* Notification Icon */}
          <button className="flex h-12 items-center hover:opacity-80 transition-opacity" aria-label="Notifications">
            <div className="overflow-clip relative size-6">
              <div className="absolute inset-[10.42%_16.67%_8.33%_16.67%]">
                <svg
                  className="absolute block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 16 19.5"
                >
                  <path d={svgPaths.p33c80af0} fill="white" />
                </svg>
              </div>
            </div>
          </button>

          {/* Help Icon */}
          <button className="flex h-12 items-center hover:opacity-80 transition-opacity" aria-label="Help">
            <div className="overflow-clip relative size-6">
              <div className="absolute inset-[8.33%]">
                <svg
                  className="absolute block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 20 20"
                >
                  <path d={svgPaths.p11e5c600} fill="white" />
                </svg>
              </div>
            </div>
          </button>

          {/* Profile Icon */}
          <button className="flex items-center hover:opacity-80 transition-opacity" aria-label="Profile">
            <div className="bg-[#5cb335] flex items-center justify-center rounded-full size-7">
              <span className="font-['Roboto',sans-serif] font-medium leading-none text-[15px] text-center text-white">
                JB
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}