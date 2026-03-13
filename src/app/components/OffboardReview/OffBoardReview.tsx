import ReviewSubmit from '../ReviewAndSubmit/ReviewSubmit';
import { DataHandlingTool, OffBoardConfirmationState, StepType } from '../Utils/UiUtilis';
import { DataHandling } from './DataHandling';
import { OffboardingConfirmation } from './OffboardingConfirmation';
import { ProjectDetails } from './ProjectDetails';
import { RequestSummary } from './RequestSummary';
import { Tools } from './Tools';
import { UsersSummary } from './UsersSummary';

interface User {
  id: number;
  name: string;
  email: string;
  accessLevel: string;
  toolCount: number;
  status: string | null;
  tools: string[];
  selected: boolean;
}
interface OffBoardReviewProps {
  selectOffboadingScope: string;
  offBoardconfirmation: OffBoardConfirmationState;
  setOffBoardConfirmation: React.Dispatch<React.SetStateAction<OffBoardConfirmationState>>;
  dataHandlingtools: DataHandlingTool[],
  existingProjectDetailsFormData:any,
  existingProjectMetadata:any,
  handleEditButton :(step : StepType , tittle:string , desc:string) => void;
  }
export const OffBoardReview: React.FC<OffBoardReviewProps> = ({
  selectOffboadingScope,
  offBoardconfirmation,
  setOffBoardConfirmation,
  dataHandlingtools,
  existingProjectDetailsFormData,
  existingProjectMetadata,handleEditButton
}) => {
    const existingProject: any | null = existingProjectDetailsFormData?.existingProject ?? null;
  const searchValue: string = existingProjectDetailsFormData?.searchValue ?? '';
    const existingtools: any| null = existingProjectMetadata?.result?.existingtools?.map((tool: any) => ({ name: tool, platform: "AP Platform"  })) ?? null;
    const userCardDetails = existingProjectDetailsFormData?.existingProject?.namevalue?? null;


 const initialUsers: User[] =
    userCardDetails &&
    Object.entries(userCardDetails).map(([name, tools], index) => {
      const uniqueTools = [...new Set(tools as string[])];
      return {
        id: index + 1,
        name,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        tools: uniqueTools,
        toolCount: uniqueTools.length,
        accessLevel: uniqueTools.length > 2 ? 'Full Access' : 'Limited Access',
        status: uniqueTools.length > 0 ? 'offboarded' : 'no-change',
        selected: false,
      };
    });


  return (
    <div>
      <RequestSummary />
      <ProjectDetails existingProject={existingProject} selectOffboadingScope={selectOffboadingScope} searchValue={searchValue}  handleEditButton={handleEditButton} />
      <Tools selectOffboadingScope={selectOffboadingScope} existingtools={existingtools}  handleEditButton={handleEditButton} />
      <UsersSummary selectOffboadingScope={selectOffboadingScope} initialUsers={initialUsers}  handleEditButton={handleEditButton}/>
      <DataHandling selectOffboadingScope={selectOffboadingScope} dataHandlingtools={dataHandlingtools} handleEditButton={handleEditButton}/>
      <OffboardingConfirmation
        selectOffboadingScope={selectOffboadingScope}
        offBoardconfirmation={offBoardconfirmation}
        setOffBoardConfirmation={setOffBoardConfirmation}
      />
    </div>
  );
};
