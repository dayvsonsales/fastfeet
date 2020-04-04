import React, { useState, useRef, useEffect } from 'react';

import { useField } from '@unform/core';
import { MdInsertPhoto } from 'react-icons/md';
import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput({ name, url }) {
  const { defaultValue, registerField, fieldName } = useField(name);
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(
    (defaultValue && defaultValue.url) || url
  );

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'dataset.avatar', // ele não explica na aula, mas este path é por onde o unform vai conseguir pegar a variável name, ou seja, será populado o name avatar_id pelo que houver no campo data-avatar
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url: _url } = response.data;

    setFile(id);
    setPreview(_url);
  }

  return (
    <Container>
      <label htmlFor={fieldName}>
        {preview || url ? (
          <img src={preview || url} alt="" />
        ) : (
          <div>
            <MdInsertPhoto color="#DDDDDD" size={40} />
            <strong>Adicionar foto</strong>
          </div>
        )}

        <input
          type="file"
          id={fieldName}
          accept="image/*"
          onChange={handleChange}
          data-avatar={file}
          ref={ref}
        />
      </label>
    </Container>
  );
}
