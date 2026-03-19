import { RemovalOptionsCard } from './RemovalOptionsCard';
import { ToolsCard } from './ToolsCard';
import { UsersCard } from './UsersCard';

interface ImpactAccessProps {
  selectOffboadingScope: string;
  selectedOption: string;
  onRemoveOptionChange: (value: string) => void;
  selectedOffBoardngImpactTools: string[];
  setSelectedOffBoardingImpactTools: React.Dispatch<React.SetStateAction<string[]>>;
  existingProjectMetadata?: any;
  existingProjectDetailsFormData: any;
}

export const ImpactAccess: React.FC<ImpactAccessProps> = ({
  selectOffboadingScope,
  onRemoveOptionChange,
  selectedOption,
  selectedOffBoardngImpactTools,
  setSelectedOffBoardingImpactTools,
  existingProjectMetadata,
  existingProjectDetailsFormData,
}) => {
  const existingtools: any | null =
    existingProjectMetadata?.result?.existingtools?.map((tool: any) => ({
      name: tool,
      platform: 'AP Platform',
    })) ?? null;
  const userCardDetails = existingProjectDetailsFormData?.existingProject?.namevalue ?? null;
  return (
    <div>
      <div>
        {selectOffboadingScope !== 'users' && (
          <ToolsCard
            selectOffboadingScope={selectOffboadingScope}
            selectedOffBoardngImpactTools={selectedOffBoardngImpactTools}
            setSelectedOffBoardingImpactTools={setSelectedOffBoardingImpactTools}
            existingtools={existingtools}
          />
        )}

        {selectOffboadingScope === 'users' && (
          <RemovalOptionsCard
            onRemoveOptionChange={onRemoveOptionChange}
            selectedOption={selectedOption}
          />
        )}
        {selectOffboadingScope === 'users' ? (
          selectedOption && (
            <UsersCard
              selectOffboadingScope={selectOffboadingScope}
              userCardDetails={userCardDetails}
            />
          )
        ) : (
          <UsersCard
            selectOffboadingScope={selectOffboadingScope}
            userCardDetails={userCardDetails}
          />
        )}
      </div>
    </div>
  );
};
