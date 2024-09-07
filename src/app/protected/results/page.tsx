// Components
import { helpers } from "@/app/utils/trpc/serverClient";
import { JobResultsSection } from "../../components/sections/job-results/job-results-section";

const Results = async () => {
    const popularJobTitles = await helpers.jobs.getSampleJobTitles.fetch();
    console.log(popularJobTitles, "popularJobTitles");

    return (
        <div className="flex flex-col items-center justify-center">
            <JobResultsSection />
        </div>
    );
};

export default Results;
