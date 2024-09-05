"use client";

import React from 'react';

const defaultClassNameArray = ["row mt-3", "col-12", "col-12"];

const InputWithLabel = (props) => {
    const {
        fields = {},
        state = {},
        onChangeHandler = () => {},
        className = defaultClassNameArray,
        additionalValidation = (value) => value,
    } = props;

    const {
        type = "text",
        label = "",
        placeholder = "",
        name = "",
        isDisabled = false,
        isReadOnly = false,
        isRequired = false,
        isHidden = false,
        maxLength = null,
    } = fields;

    return (
        <div className={className[0]}>
            {label && (
                <div className={className[1]}>
                    <label>{label}{isRequired && <span> *</span>}</label>
                </div>
            )}
            <div className={className[2]}>
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    className='form-control'
                    value={state?.[name]}
                    onChange={(e) => {
                        e.target.value = additionalValidation(e.target.value);
                        onChangeHandler(e);
                    }}
                    readOnly={isReadOnly}
                    disabled={isDisabled}
                    hidden={isHidden}
                    maxLength={maxLength}
                    required={isRequired}
                />
            </div>
        </div>
    );
};

export default InputWithLabel;
