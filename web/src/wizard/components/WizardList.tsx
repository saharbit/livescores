import styled from "styled-components";
import React from "react";

const List = styled.div``;

const WizardList: React.FC = ({ children }) => {
    return (
        <List className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-6 lg:grid-cols-8 overflow-auto wizard-list">
            {children}
        </List>
    );
};

export default WizardList;
