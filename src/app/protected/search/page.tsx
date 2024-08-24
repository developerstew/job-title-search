// Utils
import { JobSearchSection } from '@/app/components/sections/job-search-section';
import { serverClient } from '@/app/utils/trpc/serverClient';

// Compnents

const Search = async () => {
    const popularJobTitles = await serverClient.jobs.getPopularJobTitles();

    return <JobSearchSection popularJobTitleData={popularJobTitles} />;
};

export default Search;
