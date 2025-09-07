import React from "react";
import useForm from "../hooks/useForm";

const FormContext = React.createContext(null);

export const FormProvider = (props) => {
    const formLogic = useForm();

    return React.createElement(
        FormContext.Provider,
        { value: formLogic },
        props.children
    );
};

export const useFormContext = () => {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};

export default FormContext;
