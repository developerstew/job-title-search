'use client';

import React from 'react';

interface InputFieldProps {
    value: string;
    // @ts-ignore
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ value, onChange }) => (
    <input
        className="rounded-md border border-gray-300 px-4 py-2 text-inherit focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        type="text"
        value={value}
        onChange={onChange}
    />
);
