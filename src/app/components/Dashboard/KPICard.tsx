import svgPaths from '../../../imports/svg-w3qi05nelx';

interface KPICardProps {
  title: string;
  value: number;
  icon: 'clock' | 'message' | 'check' | 'x';
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
  };

  const config = iconConfig[icon];

  return (
    <div className="bg-white border border-[#e4e4e4] rounded-lg p-4 flex-1 min-w-[200px] hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex gap-5 items-center">
        {/* Icon */}
        <div className={`${config.bgColor} p-2 rounded`}>
          <div className="relative size-7">{config.svg}</div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
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
          <p className="font-['Roboto',sans-serif] font-bold text-[19px] text-[#28292c]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}