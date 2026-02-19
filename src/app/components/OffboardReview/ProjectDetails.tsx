import svgPaths from "../../../imports/svg-0ywn1y5h0h";

interface FieldProps {
  label: string;
  value: string;
}

function Field({ label, value }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-[15px] text-[#4a4a4a]">{label}</p>
      <p className="font-normal text-[14px] text-[#4a4a4a] leading-[18px]">{value}</p>
    </div>
  );
}

export function ProjectDetails() {
  return (
    <section className="bg-white rounded-lg p-6">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[19px] text-[#4a4a4a]">Project Details</h2>
          <button className="flex items-center gap-0.5 h-5 text-[#4a4a4a] hover:text-[#333] transition-colors">
            <div className="w-5 h-5 relative">
              <div className="absolute inset-[12.62%_12.62%_12.5%_12.5%]">
                <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9757 14.9757">
                  <path d={svgPaths.p42c2a80} fill="currentColor" />
                </svg>
              </div>
            </div>
            <span className="font-medium text-[13px] tracking-[0.26px]">Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Field label="ERTM Project ID" value="PRJ-8YV03FK" />
          <Field label="SAP Project ID" value="SAP-PRJ001" />
          <Field label="Project Code Name" value="PCN-0004" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Field label="Project Type" value="Development" />
          <Field label="Estimated Start Date" value="January 7th, 2026" />
          <Field label="Estimated End Date" value="January 30th, 2026" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Field label="Is Personal or Protected Data Involved?" value="Yes" />
          <Field label="Project Description" value="Not provided" />
        </div>
      </div>
    </section>
  );
}
