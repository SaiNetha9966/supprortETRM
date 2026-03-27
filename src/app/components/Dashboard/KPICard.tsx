import svgPaths from '../../../imports/svg-w3qi05nelx';

interface KPICardProps {
  title: string;
  value: number;
  icon: 'clock' | 'message' | 'check' | 'x' | 'draft';
  showInfo?: boolean;
}

export function KPICard({ title, value, icon, showInfo = false }: KPICardProps) {
  const iconConfig = {
    clock: {
      bgColor: 'bg-[#ffd0a7]',
      strokeColor: '#B86A0F',
      svg: (
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 28"
        >
          <path
            d={svgPaths.p1fa66600}
            stroke="#B86A0F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.83333"
          />
          <path
            d="M14 7V14L18.6667 16.3333"
            stroke="#B86A0F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.83333"
          />
        </svg>
      ),
    },
    message: {
      bgColor: 'bg-[#b0deeb]',
      strokeColor: '#024870',
      svg: (
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 28"
        >
          <path
            d={svgPaths.pd630b00}
            stroke="#024870"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    check: {
      bgColor: 'bg-[#a5d192]',
      strokeColor: '#3F702A',
      svg: (
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 28"
        >
          <path
            d={svgPaths.p1fa66600}
            stroke="#3F702A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.83333"
          />
          <path
            d={svgPaths.p309e840}
            stroke="#3F702A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.83333"
          />
        </svg>
      ),
    },
    x: {
      bgColor: 'bg-[#f1b5b7]',
      strokeColor: '#BF494E',
      svg: (
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 28"
        >
          <path
            d={svgPaths.p1fa66600}
            stroke="#BF494E"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.83333"
          />
          <path
            d="M17.5 10.5L10.5 17.5"
            stroke="#BF494E"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.83333"
          />
          <path
            d="M10.5 10.5L17.5 17.5"
            stroke="#BF494E"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.83333"
          />
        </svg>
      ),
    },
    draft: {
      bgColor: 'bg-[#E4E4E4]',
      strokeColor: '##6A7282',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M17.5001 2.33337H7.00008C6.38124 2.33337 5.78775 2.57921 5.35017 3.01679C4.91258 3.45438 4.66675 4.04787 4.66675 4.66671V23.3334C4.66675 23.9522 4.91258 24.5457 5.35017 24.9833C5.78775 25.4209 6.38124 25.6667 7.00008 25.6667H21.0001C21.6189 25.6667 22.2124 25.4209 22.65 24.9833C23.0876 24.5457 23.3334 23.9522 23.3334 23.3334V8.16671L17.5001 2.33337Z"
            stroke="#6A7282"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.3333 2.33337V7.00004C16.3333 7.61888 16.5791 8.21237 17.0167 8.64996C17.4543 9.08754 18.0477 9.33337 18.6666 9.33337H23.3333"
            stroke="#6A7282"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.6666 10.5H9.33325"
            stroke="#6A7282"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.6666 15.1666H9.33325"
            stroke="#6A7282"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.6666 19.8334H9.33325"
            stroke="#6A7282"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
  };

  const config = iconConfig[icon];

  return (
    <div className="bg-white border border-[#e4e4e4] rounded-lg p-4 flex-1 min-w-[200px]">
      <div className="flex gap-5 items-center">
        {/* Icon */}
        <div className={`${config.bgColor} p-2 rounded`}>
          <div className="relative size-7">{config.svg}</div>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-">
            <p className="font-['Roboto',sans-serif] font-normal leading-[19px] text-sm text-[#4a4a4a]">
              {title}
            </p>
            {showInfo && (
              <div className="relative size-4">
                <div className="absolute inset-[8.33%]">
                  <svg
                    className="absolute block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 13.3333 13.3333"
                  >
                    <path d={svgPaths.p32f50700} fill="#4A4A4A" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <p className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#28292c]">{value}</p>
        </div>
      </div>
    </div>
  );
}
