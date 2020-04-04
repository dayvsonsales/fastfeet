import React, { useRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useField } from '@unform/core';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
        onFocus={(e) => {
          const val = e.target.value;
          e.target.value = '';
          e.target.value = val;
        }}
      />

      {error && <span className="error">{error}</span>}
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};
