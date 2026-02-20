

import { RemovalOptionsCard } from "./RemovalOptionsCard";
import { ToolsCard } from "./ToolsCard";
import { UsersCard } from "./UsersCard";

interface ImpactAccessProps{
  selectOffboadingScope:string
}

 export const ImpactAccess: React.FC<ImpactAccessProps> = ({selectOffboadingScope }) => {
  
  return (
    <div className="min-h-screen bg-[#efefef] font-['Roboto',sans-serif]">
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-4 md:gap-6">
            <ToolsCard />
            <RemovalOptionsCard />
            <UsersCard />
          </div>
        </main>
      </div>
  );
}
