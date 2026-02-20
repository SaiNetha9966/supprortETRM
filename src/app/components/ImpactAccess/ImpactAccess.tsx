

import { RemovalOptionsCard } from "./RemovalOptionsCard";
import { ToolsCard } from "./ToolsCard";
import { UsersCard } from "./UsersCard";

interface ImpactAccessProps{
  selectOffboadingScope:string
}

 export const ImpactAccess: React.FC<ImpactAccessProps> = ({selectOffboadingScope }) => {
  
  return (
    <div className="min-h-screen  font-['Roboto',sans-serif]">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-4 md:gap-6">
            <ToolsCard />
            <RemovalOptionsCard />
            <UsersCard />
          </div>
      </div>
  );
}
