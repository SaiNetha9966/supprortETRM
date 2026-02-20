

import { RemovalOptionsCard } from "./RemovalOptionsCard";
import { ToolsCard } from "./ToolsCard";
import { UsersCard } from "./UsersCard";

interface ImpactAccessProps{
  selectOffboadingScope:string
}

 export const ImpactAccess: React.FC<ImpactAccessProps> = ({selectOffboadingScope }) => {
  
  return (
    <div >
          <div>
            <ToolsCard selectOffboadingScope={selectOffboadingScope} />
            {
              selectOffboadingScope ==="users" && (
               <RemovalOptionsCard />
              )
            }
            <UsersCard selectOffboadingScope={selectOffboadingScope} />
          </div>
       </div>
  );
}
