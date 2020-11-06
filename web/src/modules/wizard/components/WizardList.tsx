import React from "react";
import styled from "styled-components";

const List = styled.div`
    max-height: calc(100vh - 112px);
`;

const WizardList: React.FC = ({ children }) => {
    return (
        <List className="grid gap-2 grid-cols-3 md:grid-cols-6 lg:grid-cols-8">
            {children}
        </List>
    );
};

export default WizardList;
