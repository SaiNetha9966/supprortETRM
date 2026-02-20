import ReviewSubmit from '../ReviewAndSubmit/ReviewSubmit';
import { DataHandling } from './DataHandling';
import { OffboardingConfirmation } from './OffboardingConfirmation';
import { ProjectDetails } from './ProjectDetails';
import { RequestSummary } from './RequestSummary';
import { Tools } from './Tools';
import { UsersSummary } from './UsersSummary';

interface OffBoardReviewProps{
  selectOffboadingScope:string;
}
export const OffBoardReview: React.FC<OffBoardReviewProps> =({selectOffboadingScope}) =>{
  return (
    <div>
      <RequestSummary />
      <ProjectDetails selectOffboadingScope={selectOffboadingScope} />
      <Tools selectOffboadingScope={selectOffboadingScope} />
      <UsersSummary />
      <DataHandling />
      <OffboardingConfirmation />
    </div>
  );
}
