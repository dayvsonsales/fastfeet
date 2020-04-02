import React from 'react';

import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import Select from 'react-select';
import { Container, FormContainer } from './styles';
import ActionList from '~/components/ActionList';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function Form() {
  return (
    <Container>
      <header>
        <strong>Cadastro de encomendas</strong>
        <div>
          <button disabled type="button">
            <MdKeyboardArrowLeft size={24} color="#fff" />
            <span>Voltar</span>
          </button>
          <button type="button">
            <MdDone size={24} color="#fff" />
            <span>Salvar</span>
          </button>
        </div>
      </header>

      <FormContainer>
        <label htmlFor="" />
        <Select
          options={options}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </FormContainer>
    </Container>
  );
}
