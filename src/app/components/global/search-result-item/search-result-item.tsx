"use client";

import React from "react";

interface SearchResultItemProps {
    title: string;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
    title,
}) => {
    return (
        <div className="w-screen px-10">
            <div className="border-b border-gray-200 p-4">
                <h2 className="cursor-pointer text-xl text-blue-600 hover:underline">
                    {title}
                </h2>
                {/* TODO: Add more data here like related titles */}
                <p className="text-gray-600">
                    Some description or snippet here...
                </p>
            </div>
        </div>
    );
};
