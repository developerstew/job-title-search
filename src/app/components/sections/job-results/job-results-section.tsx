"use client";

import { NextResponse } from "next/server";
import React, { useEffect, useMemo, useState } from "react";

// Components
import { SearchResultItem } from "@/app/components/global/search-result-item";
import { Search } from "@/app/components/global/search/search";

interface JobTitle {
    title: string;
    id: string;
}

export const JobResultsSection: React.FC = () => {
    // State
    const [inputValue, setInputValue] = useState("");
    const [jobTitleData, setJobTitleData] = useState<JobTitle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = useMemo(() => {
        return (query: string) => {
            setSearchQuery(query);
            setIsLoading(true);
        };
    }, []);

    const fetchJobTitles = async (query: string) => {
        if (query) {
            try {
                const response = await fetch(`/api/jobs/get-by-title/${query}`);
                const data = await response.json();
                setJobTitleData(data);
            } catch (error) {
                NextResponse.json({ error });
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchJobTitles(searchQuery);
    }, [searchQuery]);

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
