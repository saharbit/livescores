import React from "react";
import Search from "@kiwicom/orbit-components/lib/icons/Search";
import { InputField } from "@kiwicom/orbit-components/lib";

type Props = {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
};

const WizardSearchInput: React.FC<Props> = ({ placeholder, value, onChange, disabled }) => {
    return (
        <div className="px-2 lg:px-0">
            <InputField
                placeholder={placeholder}
                value={value}
                onChange={(event: any) => onChange(event.target.value)}
                prefix={<Search />}
                disabled={disabled}
            />
        </div>
    );
};

export default WizardSearchInput;
