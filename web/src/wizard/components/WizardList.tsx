import React from "react";

const WizardList: React.FC = ({ children }) => {
    return <div className="grid gap-2 grid-cols-3 md:grid-cols-6 lg:grid-cols-8">{children}</div>;
};

export default WizardList;
