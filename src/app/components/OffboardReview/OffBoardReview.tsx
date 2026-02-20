import ReviewSubmit from '../ReviewAndSubmit/ReviewSubmit';
import { DataHandling } from './DataHandling';
import { OffboardingConfirmation } from './OffboardingConfirmation';
import { ProjectDetails } from './ProjectDetails';
import { RequestSummary } from './RequestSummary';
import { Tools } from './Tools';
import { UsersSummary } from './UsersSummary';

export default function OffBoardReview() {
  return (
    <div className="bg-[#f1f1f1] min-h-screen">
      <RequestSummary />
      <ProjectDetails />
      <Tools />
      <UsersSummary />
      <DataHandling />
      <OffboardingConfirmation />
    </div>
  );
}
