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
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-blue-600 text-xl hover:underline cursor-pointer">
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
