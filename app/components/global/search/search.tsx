"use client";

// Components
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "../button";
import { InputField } from "../input-field";

// Types
interface SearchProps {
    inputValue: string;
    isLoading: boolean;
    query: string;
    onInputChange: (inputValue: string) => void;
    onSearch: (query: string) => void;
}

export const Search: React.FC<SearchProps> = ({
    inputValue,
    isLoading,
    query,
    onInputChange,
    onSearch,
}) => {
    // Router
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const searchQuery = searchParams.get(query);

    useEffect(() => {
        if (searchQuery) {
            onSearch(searchQuery);
        }
    }, [searchQuery, onSearch]);

    const handleSetSearchQuery = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(query, inputValue);
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-center">
            <InputField
                value={inputValue}
                onEnterPress={handleSetSearchQuery}
                onChange={(e) => onInputChange(e.target.value)}
            />

            <Button
                copy="Search"
                isLoading={isLoading}
                onClick={handleSetSearchQuery}
            />
        </div>
    );
};
