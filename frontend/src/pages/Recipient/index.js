import React, { useState, useRef, useEffect } from 'react';

import { MdAdd, MdMoreHoriz, MdDeleteForever, MdCreate } from 'react-icons/md';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container } from './styles';

import DeliveryStatus from '~/components/DeliveryStatus';
import { Dropdown, DropdownContent } from '~/components/Dropdown/styles';

import SearchInput from '~/components/ActionList/SearchInput';
import ActionList from '~/components/ActionList';
import Table from '~/components/Table';
import { generateSlug } from '~/utils/helper';

export default function Recipient({ history }) {
  const [recipients, setRecipients] = useState([]);
  const [name, setName] = useState('');

  function handleSearch(_name) {
    setName(_name);
  }

  async function handleDelete({ id }) {
    if (
      window.confirm('Se você remover, não poderá mais recuperar. Tem certeza?')
    ) {
      try {
        await api.delete(`recipients/${id}`);

        setRecipients(recipients.filter((d) => d.id !== id));

        toast.success('Removido com sucesso!');
      } catch (e) {
        toast.error(
          'Ocorreu um erro ao remover entregador. Tente novamente mais tarde'
        );
      }
    }
  }

  async function loadDeliverymen(page = 1) {
    const response = await api.get(`/recipients?page=${page}&q=${name}`);

    const data = response.data.rows.map((recipient) => ({
      ...recipient,
      full_address: `${recipient.street}, ${recipient.number || 'S/N'}, ${
        recipient.city
      } - ${recipient.state}`,
    }));

    setRecipients(data);
  }

  useEffect(() => {
    loadDeliverymen();
  }, [name]);

  return (
    <Container>
      <header>
        <strong>Gerenciando destinatários</strong>
      </header>

      <ActionList>
        <SearchInput
          placeholder="Buscar por destinatários"
          onEnter={handleSearch}
        />

        <button type="button" onClick={() => history.push('/recipient/create')}>
          <MdAdd size={24} color="#fff" />
          <span>Cadastrar</span>
        </button>
      </ActionList>

      <Table>
        <thead>
          <tr>
            <th width="8%">ID</th>
            <th width="20%">Nome</th>
            <th width="60%">Endereço</th>
            <th width="5%">Ações</th>
          </tr>
        </thead>

        <tbody>
          {recipients.map((recipient) => (
            <tr>
              <td>#{recipient.id < 10 ? `0${recipient.id}` : recipient.id}</td>
              <td>{recipient.name}</td>
              <td>{recipient.full_address}</td>
              <td>
                <Dropdown>
                  <MdMoreHoriz size={24} color="#C6C6C6" />
                  <DropdownContent>
                    <Link to={`/recipient/edit/${recipient.id}`}>
                      <MdCreate size={10} color="#4D85EE" />
                      Editar
                    </Link>
                    <Link href="delete" onClick={() => handleDelete(recipient)}>
                      <MdDeleteForever size={10} color="#DE3B3B" />
                      Excluir
                    </Link>
                  </DropdownContent>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

Recipient.propTypes = {
  history: PropTypes.shape().isRequired,
};
