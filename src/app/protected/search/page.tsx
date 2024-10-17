// Compnents
import { JobSearchSection } from "../../components/sections/job-search-section";

// Utils
import { clientHelpers } from "../../utils/trpc/serverClient";

const Search = async () => {
    const client = await clientHelpers();
    const popularJobTitles = await client.jobs.getPopularJobTitles.fetch();

    return <JobSearchSection popularJobTitleData={popularJobTitles} />;
};

export default Search;
