"use client";

import React from "react";

interface CopyTagProps {
    copy: string;
}

export const CopyTag: React.FC<CopyTagProps> = ({ copy }) => (
    <div className="flex h-4 w-fit items-center rounded-full bg-blue-300 px-1.5 py-1 text-[0.625rem] leading-4">
        {copy}
    </div>
);
