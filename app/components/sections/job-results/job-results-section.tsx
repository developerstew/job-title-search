"use client";

import React, { 
    useMemo, 
    useState,
} from "react";

// Components
import { SearchResultItem } from "../../global/search-result-item";
import { Search } from "../../global/search/search";

// Utils
import { client } from "../../../utils/trpc/client";

export const JobResultsSection: React.FC = () => {
    // State
    const [inputValue, setInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = useMemo(() => {
        return (query: string) => {
            setSearchQuery(query);
        };
    }, []);

    const { data: jobTitleData = [], isLoading, error } = client.jobs.searchJobTitles.useQuery(
        { query: searchQuery },
        {
            enabled: !!searchQuery,
        }
    );

    const filteredJobTitles = useMemo(() => {
        return jobTitleData.filter((job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [jobTitleData, searchQuery]);

    return (
        <section>
            <Search
                inputValue={inputValue}
                isLoading={isLoading}
                query="search"
                onInputChange={setInputValue}
                onSearch={handleSearch}
            />

            {/* TODO: Add pagination */}
            <div className="flex flex-col gap-2 pt-8 pb-4 w-full">
                {!isLoading &&
                    (filteredJobTitles.length === 0 ? (
                        <p className="text-red-500">No data found</p>
                    ) : (
                        filteredJobTitles.map(({ title, id }) => (
                            <SearchResultItem key={id} title={title} />
                        ))
                    ))}
            </div>
        </section>
    );
};
