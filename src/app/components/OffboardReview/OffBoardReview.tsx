import ReviewSubmit from '../ReviewAndSubmit/ReviewSubmit';
import { OffBoardConfirmationState } from '../Utils/UiUtilis';
import { DataHandling } from './DataHandling';
import { OffboardingConfirmation } from './OffboardingConfirmation';
import { ProjectDetails } from './ProjectDetails';
import { RequestSummary } from './RequestSummary';
import { Tools } from './Tools';
import { UsersSummary } from './UsersSummary';

interface OffBoardReviewProps {
  selectOffboadingScope: string;
   offBoardconfirmation:OffBoardConfirmationState;
    setOffBoardConfirmation:React.Dispatch<React.SetStateAction<OffBoardConfirmationState>>;
}
export const OffBoardReview: React.FC<OffBoardReviewProps> = ({ selectOffboadingScope,offBoardconfirmation,setOffBoardConfirmation }) => {
  return (
    <div>
      <RequestSummary />
      <ProjectDetails selectOffboadingScope={selectOffboadingScope} />
      <Tools selectOffboadingScope={selectOffboadingScope} />
      <UsersSummary selectOffboadingScope={selectOffboadingScope} />
      <DataHandling selectOffboadingScope={selectOffboadingScope} />
      <OffboardingConfirmation 
      selectOffboadingScope={selectOffboadingScope}
      offBoardconfirmation ={offBoardconfirmation}
      setOffBoardConfirmation ={setOffBoardConfirmation}
       />
    </div>
  );
};
