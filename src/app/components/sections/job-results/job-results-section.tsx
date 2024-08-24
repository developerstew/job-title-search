'use client';

// Components
import { CopyTag } from '@/app/components/global/copy-tag';
import { Search } from '@/app/components/global/search/search';
// Utils
import { client } from '@/app/utils/trpc/client';
import { NextResponse } from 'next/server';
import React, { useEffect, useState } from 'react';

export const JobResultsSection: React.FC = () => {
    // State
    // TODO: See if we need both states here
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // TRPC
    const {
        data: jobTitleData,
        isLoading,
        refetch,
    } = client.jobs.searchJobTitles.useQuery(
        {
            query: searchQuery,
        },
        {
            enabled: false,
        }
    );

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
        if (searchQuery) {
            refetch();
        }
    }, [searchQuery, refetch]);

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
                {Array.isArray(jobTitleData) ? (
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
