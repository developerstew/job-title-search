// Utils

// Compnents
// import { CopyTag } from '@/app/components/global/copy-tag';
import { JobResultsSection } from '@/app/components/sections/job-results/job-results-section';

// import { serverClient } from '@/app/utils/trpc/serverClient';

const Results = async () => (
    <div className="flex flex-col items-center justify-center">
        <JobResultsSection />
    </div>
);

export default Results;
