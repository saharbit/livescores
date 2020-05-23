import React from "react";
import styled from "styled-components";

const Container = styled.div`
    padding-bottom: 44px; // Continue button height
`;

const WizardContainer: React.FC = ({ children }) => {
    return <Container className="container mx-auto xl:max-w-screen-lg">{children}</Container>;
};

export default WizardContainer;
