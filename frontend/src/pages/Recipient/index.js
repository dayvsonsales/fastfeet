import React, { useState, useEffect } from 'react';

import { MdAdd, MdDeleteForever, MdCreate } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BulletList as Loading } from 'react-content-loader';
import PropTypes from 'prop-types';
import { Container } from '~/components/Container/styles';

import Dropdown from '~/components/Dropdown';

import api from '~/services/api';

import SearchInput from '~/components/ActionList/SearchInput';
import ActionList from '~/components/ActionList';
import Table from '~/components/Table';

import Paginator from '~/components/Paginator';

export default function Recipient({ history }) {
  const [recipients, setRecipients] = useState([]);
  const [name, setName] = useState('');

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  function handleSearch(_name) {
    setName(_name);
  }

  async function handleDelete({ id }) {
    if (
      window.confirm('Se você remover, não poderá mais recuperar. Tem certeza?')
    ) {
      try {
        await api.delete(`recipients/${id}`);

        const data = recipients.filter((d) => d.id !== id);

        setRecipients(data);
        setTotal(data.length);

        if (data.length === 0) {
          setPage(page - 1);
        } else {
          const _page = page;
          setPage(0);
          setPage(_page);
        }

        toast.success('Removido com sucesso!');
      } catch (e) {
        toast.error('Não foi possível remover entregador.');
      }
    }
  }

  useEffect(() => {
    async function loadRecipients() {
      if (page < 1) {
        return;
      }

      setLoading(true);

      const response = await api.get(`/recipients?page=${page}&q=${name}`);

      setTotal(response.data.count);

      const data = response.data.rows.map((recipient) => ({
        ...recipient,
        full_address: `${recipient.street}, ${recipient.number || 'S/N'} ${
          recipient.address_line
        }, ${recipient.city} - ${recipient.state}`,
      }));

      setLoading(false);
      setRecipients(data);
    }

    loadRecipients();
  }, [name, page]);

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
      {loading ? (
        <Loading
          backgroundColor="#fff"
          foregroundColor="#999"
          style={{ width: '50%', height: '20%' }}
        />
      ) : (
        <>
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
                <tr key={recipient.id}>
                  <td>
                    #{recipient.id < 10 ? `0${recipient.id}` : recipient.id}
                  </td>
                  <td>{recipient.name}</td>
                  <td>{recipient.full_address}</td>
                  <td>
                    <Dropdown>
                      <Link to={`/recipient/edit/${recipient.id}`}>
                        <MdCreate size={10} color="#4D85EE" />
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(recipient)}
                      >
                        <MdDeleteForever size={10} color="#DE3B3B" />
                        <span>Excluir</span>
                      </button>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Paginator
            limit={5}
            page={page}
            total={total}
            handlePaginator={setPage}
          />
        </>
      )}
    </Container>
  );
}

Recipient.propTypes = {
  history: PropTypes.shape().isRequired,
};
