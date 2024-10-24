"use client";

import React, { useMemo, useState } from "react";

// Components
import { SearchResultItem } from "@/src/app/components/global/search-result-item/search-result-item";
import { Search } from "@/src/app/components/global/search/search";

// Utils
import { client } from "@/src/app/utils/trpc/client";

export const JobResultsSection: React.FC = () => {
    // State
    const [inputValue, setInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = useMemo(() => {
        return (query: string) => {
            setSearchQuery(query);
        };
    }, []);

    const { data: jobTitleData = [], isLoading } =
        client.jobs.searchJobTitles.useQuery(
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
            <div className="flex w-full flex-col gap-2 pb-4 pt-8">
                {!isLoading &&
                    searchQuery &&
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
