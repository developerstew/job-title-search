"use client";

import React from "react";

interface ButtonProps {
    copy: string;
    isLoading?: boolean;
    onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
    copy,
    isLoading = false,
    onClick,
}) => (
    <button
        className="ml-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
        type="button"
        onClick={onClick}
    >
        {isLoading ? "Loading..." : copy}
    </button>
);
