// Compnents
import { JobSearchSection } from "@/app/components/sections/job-search-section";

// Utils
import { serverClient } from "@/app/utils/trpc/serverClient";

const Search = async () => {
    const popularJobTitles = await serverClient.jobs.getPopularJobTitles();

    return <JobSearchSection popularJobTitleData={popularJobTitles} />;
};

export default Search;
