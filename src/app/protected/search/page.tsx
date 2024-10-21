// Compnents
import { JobSearchSection } from "@/src/app/components/sections/job-search-section/job-search-section";

// Utils
import { clientHelpers } from "@/src/app/utils/trpc/serverClient";

const Search = async () => {
    const client = await clientHelpers();
    const popularJobTitles = await client.jobs.getPopularJobTitles.fetch();

    return <JobSearchSection popularJobTitleData={popularJobTitles} />;
};

export default Search;
