import { RemovalOptionsCard } from './RemovalOptionsCard';
import { ToolsCard } from './ToolsCard';
import { UsersCard } from './UsersCard';

interface ImpactAccessProps {
  selectOffboadingScope: string;
  selectedOption: string;
  onRemoveOptionChange: (value: string) => void;
  selectedOffBoardngImpactTools: string[];
  setSelectedOffBoardingImpactTools: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ImpactAccess: React.FC<ImpactAccessProps> = ({
  selectOffboadingScope,
  onRemoveOptionChange,
  selectedOption,
  selectedOffBoardngImpactTools,
  setSelectedOffBoardingImpactTools,
}) => {
  return (
    <div>
      <div>
        {
          selectOffboadingScope !== 'users' && (
          <ToolsCard
          selectOffboadingScope={selectOffboadingScope}
          selectedOffBoardngImpactTools={selectedOffBoardngImpactTools}
          setSelectedOffBoardingImpactTools={setSelectedOffBoardingImpactTools}
        />
          )
        }
       
        {selectOffboadingScope === 'users' && (
          <RemovalOptionsCard
            onRemoveOptionChange={onRemoveOptionChange}
            selectedOption={selectedOption}
          />
        )}
        {selectOffboadingScope === 'users' ? (
          selectedOption && <UsersCard selectOffboadingScope={selectOffboadingScope} />
        ) : (
          <UsersCard selectOffboadingScope={selectOffboadingScope} />
        )}
      </div>
    </div>
  );
};
