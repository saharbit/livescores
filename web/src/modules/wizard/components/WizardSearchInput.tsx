import React from "react";
import Search from "@kiwicom/orbit-components/lib/icons/Search";
import { InputField } from "@kiwicom/orbit-components/lib";

type Props = {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
};

const WizardSearchInput: React.FC<Props> = ({
    placeholder,
    value,
    onChange,
    disabled,
}) => {
    return (
        <InputField
            placeholder={placeholder}
            value={value}
            onChange={(event: any) => onChange(event.target.value)}
            prefix={<Search />}
            disabled={disabled}
            spaceAfter="small"
        />
    );
};

export default WizardSearchInput;
