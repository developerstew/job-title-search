"use client";

import React, { useState } from "react";

// Components
import { CopyTag } from "@/src/app/components/global/copy-tag";
import { Search } from "@/src/app/components/global/search";
import { useRouter } from "next/navigation";

// Types
interface JobSearchSectionProps {
    popularJobTitleData: {
        title: string;
        id: string;
    }[];
}

export const JobSearchSection: React.FC<JobSearchSectionProps> = ({
    popularJobTitleData,
}) => {
    // State
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setLoading] = useState(false);

    // Router
    const router = useRouter();

    const handleNavigaton = () => {
        setLoading(true);
        router.push(`/protected/results?search=${inputValue}`);
    };

    return (
        <section className="flex flex-col items-center justify-center gap-10">
            <div>
                <h2 className="font-semi-bold text-md ml-5 mt-4">
                    Popular Job Titles
                </h2>
                <div className="flex flex-wrap gap-2 pt-2">
                    {popularJobTitleData.map(({ title, id }) => (
                        <CopyTag key={id} copy={title} />
                    ))}
                </div>
            </div>

            <Search
                inputValue={inputValue}
                isLoading={isLoading}
                query="search"
                onInputChange={setInputValue}
                onSearch={handleNavigaton}
            />
        </section>
    );
};
