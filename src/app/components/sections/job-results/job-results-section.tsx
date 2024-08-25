"use client";

import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";

// Components
import { CopyTag } from "@/app/components/global/copy-tag";
import { Search } from "@/app/components/global/search/search";

export const JobResultsSection: React.FC = () => {
    // State
    const [inputValue, setInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [jobTitleData, setJobTitleData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (searchQuery: string) => {
        try {
            setSearchQuery(searchQuery);
        } catch (error) {
            NextResponse.json({
                error,
            });
        }
    };

    useEffect(() => {
        const fetchJobTitles = async () => {
            if (searchQuery) {
                setIsLoading(true);
                try {
                    const response = await fetch(`/api/trpc/jobs.searchJobTitles?query=${searchQuery}`);
                    const data = await response.json();
                    setJobTitleData(data);
                } catch (error) {
                    console.error("Error fetching job titles:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchJobTitles();
    }, [searchQuery]);

    return (
        <section>
            <Search
                inputValue={inputValue}
                isLoading={isLoading}
                query="search"
                onInputChange={setInputValue}
                onSearch={handleSearch}
            />

            <div className="flex flex-wrap gap-2 pt-8">
                {Array.isArray(jobTitleData) && jobTitleData.length > 0 ? (
                    jobTitleData.map(({ title, id }) => (
                        <CopyTag key={id} copy={title} />
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </section>
    );
};