import React from "react";

type Props = {
    className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => {
    return (
        <div
            className={`container mx-auto xl:max-w-screen-md ${
                className ? className : ""
            }`}
        >
            {children}
        </div>
    );
};

export default Container;
