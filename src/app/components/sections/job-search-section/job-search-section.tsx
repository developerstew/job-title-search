"use client";

// Components
import { CopyTag } from "@/app/components/global/copy-tag";
import { Search } from "@/app/components/global/search/search";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
                <h2 className="font-semi-bold text-md mt-4 ml-5">
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
