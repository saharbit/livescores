import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const WizardContainer: React.FC = ({ children }) => {
    return <Container className="container mx-auto px-2 md:px-0 xl:max-w-screen-lg">{children}</Container>;
};

export default WizardContainer;
