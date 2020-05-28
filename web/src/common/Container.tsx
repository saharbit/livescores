import React from "react";

const Container: React.FC = ({ children }) => {
    return (
        <div className="container mx-auto xl:max-w-screen-lg mt-2">
            {children}
        </div>
    );
};

export default Container;
