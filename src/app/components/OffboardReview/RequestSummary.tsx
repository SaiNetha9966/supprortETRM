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

export function RequestSummary() {
  return (
    <section className="bg-white rounded-lg p-6">
      <div className="flex flex-col gap-8">
        <h2 className="font-bold text-[19px] text-[#4a4a4a]">Request Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Field label="Request Category" value="Non Client Project" />
          <Field label="Request Action" value="Offboarding" />
          <Field label="Change Type" value="Remove Users" />
        </div>
      </div>
    </section>
  );
}
