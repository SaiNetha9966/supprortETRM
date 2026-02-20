import svgPaths from '../../../imports/svg-0ywn1y5h0h';

export function DataHandling() {
  return (
    <section className="bg-white rounded-lg p-6">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-[19px] text-[#4a4a4a]">Data Handling Summary</h2>
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
              No data handling actions are required for this request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
