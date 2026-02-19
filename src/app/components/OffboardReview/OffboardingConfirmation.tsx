import svgPaths from "../../../imports/svg-0ywn1y5h0h";

interface CheckboxItemProps {
  label: string;
  checked?: boolean;
}

function CheckboxItem({ label, checked = true }: CheckboxItemProps) {
  return (
    <div className="flex items-center gap-2 h-4">
      <div className={`w-4 h-4 rounded-sm flex items-center justify-center ${checked ? 'bg-[#498e2b]' : 'border-2 border-gray-300'}`}>
        {checked && (
          <div className="w-3.5 h-3.5 relative">
            <div className="absolute bottom-1/4 left-[16.67%] right-[8.33%] top-[20.83%]">
              <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 7.58333">
                <path d={svgPaths.p998df00} fill="white" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <p className="font-normal text-[14px] text-[#4a4a4a] leading-none">
        <span className="text-[#cb282e]">*</span> {label}
      </p>
    </div>
  );
}

export function OffboardingConfirmation() {
  return (
    <section className="bg-white rounded-lg p-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-[19px] text-[#4a4a4a]">Offboarding Confirmation</h2>
          <div className="bg-[#f6fdff] border border-[#b0deeb] rounded-lg p-3">
            <div className="flex gap-1.5">
              <div className="w-5 h-5 relative shrink-0">
                <div className="absolute inset-[8.33%]">
                  <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
                    <path d={svgPaths.p36290900} fill="#006176" />
                  </svg>
                </div>
              </div>
              <p className="font-normal text-[14px] text-[#3b4648] leading-[19px]">
                Offboarding selected users means they will lose access to this project. Tools and data remain unchanged for all users.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <CheckboxItem label="I confirm I am authorized to offboard the selected users from this project." />
          <CheckboxItem label="I understand this will revoke project access only for the selected users." />
          <CheckboxItem label="I acknowledge that project tools and data will remain unchanged." />
        </div>
      </div>
    </section>
  );
}
