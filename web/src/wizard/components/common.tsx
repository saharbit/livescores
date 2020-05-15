import React from "react";
import styled from "styled-components";
import "../../styles/index.css";
const Container = styled.div``;

export const WizardContainer: React.FC = ({ children }) => {
    return <Container className="container mx-auto px-2">{children}</Container>;
};

const List = styled.div``;

export const WizardList: React.FC = ({ children }) => {
    return (
        <List className="my-2 grid gap-2 grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 overflow-auto wizard-list">
            {children}
        </List>
    );
};
