import React, { useState, useEffect } from 'react';

import { MdAdd, MdMoreHoriz, MdDeleteForever, MdCreate } from 'react-icons/md';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container } from './styles';

import ActionList from '~/components/ActionList';
import Table from '~/components/Table';
import Profile from '~/components/Profile';
import { Dropdown, DropdownContent } from '~/components/Dropdown/styles';
import SearchInput from '~/components/ActionList/SearchInput';
import { generateSlug } from '~/utils/helper';

import Paginator from '~/components/Paginator';

export default function Deliveryman({ history }) {
  const [deliverymen, setDeliverymen] = useState([]);
  const [name, setName] = useState('');

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  function handleSearch(_name) {
    setName(_name);
  }

  async function loadDeliverymen(_page = 1) {
    const response = await api.get(`/deliveryman?page=${_page}&q=${name}`);

    setTotal(response.data.count);
    setPage(_page);

    const data = response.data.rows.map((delivery) => {
      const { name: _name } = delivery;

      delivery.slug = generateSlug(_name);

      return {
        ...delivery,
        deliveryman: {
          ...delivery.deliveryman,
        },
      };
    });

    setDeliverymen(data);
  }

  async function handleDelete({ id }) {
    if (
      window.confirm('Se você remover, não poderá mais recuperar. Tem certeza?')
    ) {
      try {
        await api.delete(`deliveryman/${id}`);

        const data = deliverymen.filter((d) => d.id !== id);

        setDeliverymen(data);
        setTotal(data.length);

        if (data.length === 0) {
          loadDeliverymen(page - 1);
        } else {
          loadDeliverymen(page);
        }

        toast.success('Removido com sucesso!');
      } catch (e) {
        toast.error(
          'Ocorreu um erro ao remover entregador. Tente novamente mais tarde'
        );
      }
    }
  }

  useEffect(() => {
    loadDeliverymen();
  }, [name]);

  return (
    <Container>
      <header>
        <strong>Gerenciando entregadores</strong>
      </header>
      <ActionList>
        <SearchInput
          placeholder="Buscar por entregadores"
          onEnter={handleSearch}
        />

        <button
          type="button"
          onClick={() => history.push('/deliveryman/create')}
        >
          <MdAdd size={24} color="#fff" />
          <span>Cadastrar</span>
        </button>
      </ActionList>
      <Table>
        <thead>
          <tr>
            <th width="15%">ID</th>
            <th width="20%">Foto</th>
            <th width="25%">Nome</th>
            <th width="25%">Email</th>
            <th width="5%">Ações</th>
          </tr>
        </thead>

        <tbody>
          {deliverymen.map((deliveryman) => (
            <tr>
              <td>
                #{deliveryman.id < 10 ? `0${deliveryman.id}` : deliveryman.id}
              </td>
              <td>
                <Profile>
                  {deliveryman.avatar ? (
                    <img src={deliveryman.avatar.url} alt={deliveryman.name} />
                  ) : (
                    <div>{deliveryman.slug}</div>
                  )}
                </Profile>
              </td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <td>
                <Dropdown>
                  <MdMoreHoriz size={24} color="#C6C6C6" />
                  <DropdownContent>
                    <Link to={`/deliveryman/edit/${deliveryman.id}`}>
                      <MdCreate size={10} color="#4D85EE" />
                      Editar
                    </Link>
                    <Link
                      href="#delete"
                      onClick={() => handleDelete(deliveryman)}
                    >
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

      <Paginator
        limit={5}
        page={page}
        total={total}
        handlePaginator={loadDeliverymen}
      />
    </Container>
  );
}

Deliveryman.propTypes = {
  history: PropTypes.shape().isRequired,
};
