import { RemovalOptionsCard } from './RemovalOptionsCard';
import { ToolsCard } from './ToolsCard';
import { UsersCard } from './UsersCard';

interface ImpactAccessProps {
  selectOffboadingScope: string;
  selectedOption:string;
  onRemoveOptionChange:(value:string) => void;
}

export const ImpactAccess: React.FC<ImpactAccessProps> = ({ selectOffboadingScope,onRemoveOptionChange,selectedOption }) => {
  return (
    <div>
      <div>
        <ToolsCard selectOffboadingScope={selectOffboadingScope} />
        {selectOffboadingScope === 'users' && <RemovalOptionsCard onRemoveOptionChange={onRemoveOptionChange} selectedOption={selectedOption} />}
        {
          selectOffboadingScope === "users" ? (
            selectedOption && (
               <UsersCard selectOffboadingScope={selectOffboadingScope} />
            )
          ) : (<UsersCard selectOffboadingScope={selectOffboadingScope} />)
        }
      
      </div>
    </div>
  );
};
