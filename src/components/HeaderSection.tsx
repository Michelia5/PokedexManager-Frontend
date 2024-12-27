import React from "react";

interface HeaderSectionProps {
    englishName: string;
    nationalNumber: number;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ englishName, nationalNumber }) => (
    <div
        className="pokemon-header text-center relative"
        style={{ backgroundImage: `url("/images/other/battlefield.jpg")`, backgroundPosition: "center" }}
    >
        <h1 className="text-4xl font-bold text-white">
            {englishName} #{nationalNumber}
        </h1>
        <img
            src={`/images/large/${String(nationalNumber).padStart(3, "0")}.png`}
            alt={englishName}
            className="mx-auto w-40 mt-4"
        />
    </div>
);

export default HeaderSection;
