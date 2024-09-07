// Compnents
import { JobSearchSection } from "@/app/components/sections/job-search-section";

// Utils
import { helpers } from "@/app/utils/trpc/serverClient";

const Search = async () => {
    const popularJobTitles = await helpers.jobs.getPopularJobTitles.fetch();

    return <JobSearchSection popularJobTitleData={popularJobTitles} />;
};

export default Search;
