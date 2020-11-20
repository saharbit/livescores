import React from "react";
import styled from "styled-components";
import Notification from "@kiwicom/orbit-components/lib/icons/Notification";


export default function SelectItemButton({
    isSelected,
}: {
    isSelected?: boolean;
}) {
    return (
        <Select isSelected={isSelected}>
            <Notification
                size="small"
                customColor={isSelected ? "white" : "#ffdb6e"}
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
