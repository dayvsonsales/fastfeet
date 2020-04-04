import React, { useRef, useEffect } from 'react';

import { useField } from '@unform/core';
import Select from 'react-select/async';

import PropTypes from 'prop-types';

export default function AsyncSelect({ name, loadOptions, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }

          return ref.select.state.value.map((option) => option.value);
        }

        if (!ref.select.state.value) {
          return '';
        }

        return ref.select.state.value.value;
      },
    });
  }, [fieldName, selectRef, registerField, rest.isMulti]);

  return (
    <>
      <Select
        ref={selectRef}
        defaultValue={defaultValue}
        cacheOptions
        loadOptions={loadOptions}
        components={{
          IndicatorSeparator: () => null,
        }}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
}

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
};
