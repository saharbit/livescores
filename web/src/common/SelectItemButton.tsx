import React from "react";
import StarEmpty from "@kiwicom/orbit-components/lib/icons/StarEmpty";
import styled from "styled-components";

export default function SelectItemButton({
    isSelected,
}: {
    isSelected?: boolean;
}) {
    return (
        <Select isSelected={isSelected}>
            <StarEmpty
                size="small"
                customColor={isSelected ? "#000" : "#ffdb6e"}
                className="h-1 w-1"
            />
        </Select>
    );
}

const Select = styled.div<{ isSelected?: boolean }>`
    border: 2px solid #ffdb6e;
    background-color: white;
    height: 24px;
    width: 24px;
    border-radius: 12px;

    display: flex;
    align-items: center;
    justify-content: center;

    ${({ isSelected }) => isSelected && "background-color: #ffdb6e;"}
`;
