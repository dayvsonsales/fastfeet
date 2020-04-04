import React, { useState, useRef, useEffect } from 'react';

import { useField } from '@unform/core';
import { MdInsertPhoto } from 'react-icons/md';
import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput({ name, ...rest }) {
  const { defaultValue, registerField, fieldName } = useField('avatar');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const avatarRef = useRef(null);

  useEffect(() => {
    registerField({
      name: 'avatar_id',
      ref: avatarRef.current,
      path: 'dataset.avatar',
      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        setPreview(value);
      },
    });
  }, [registerField, fieldName]);

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
        {preview || (defaultValue && defaultValue.url) ? (
          <img src={preview || (defaultValue && defaultValue.url)} alt="" />
        ) : (
          <div>
            <MdInsertPhoto color="#DDDDDD" size={40} />
            <strong>Adicionar foto</strong>
          </div>
        )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleChange}
          data-avatar={file}
          ref={avatarRef}
          {...rest}
        />
      </label>
    </Container>
  );
}
