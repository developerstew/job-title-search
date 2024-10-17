"use client";

import React from "react";

// Types
interface InputFieldProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEnterPress?: () => void;
}

export const InputField: React.FC<InputFieldProps> = ({
    value,
    onChange,
    onEnterPress,
}) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && onEnterPress) {
            onEnterPress();
        }
    };

    return (
        <input
            className="rounded-md border border-gray-300 px-4 py-2 text-inherit focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
        />
    );
};
