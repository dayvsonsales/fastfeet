import React, { useState, useRef, useEffect } from 'react';

import {
  MdAdd,
  MdMoreHoriz,
  MdVisibility,
  MdDeleteForever,
  MdCreate,
} from 'react-icons/md';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import api from '~/services/api';

import {
  Container,
  DeliveryInformation,
  Street,
  CityAndState,
  Zip,
  Date,
  HorizontalLine,
} from './styles';

import ActionList from '~/components/ActionList';
import Table from '~/components/Table';
import Profile from '~/components/Profile';
import DeliveryStatus from '~/components/DeliveryStatus';
import Modal from '~/components/Modal';
import { Dropdown, DropdownContent } from '~/components/Dropdown/styles';

import SearchInput from '~/components/ActionList/SearchInput';

import { generateSlug, type } from '~/utils/helper';

export default function Delivery({ history }) {
  const refModal = useRef(null);
  const [show, setShow] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [currentDelivery, setCurrentDelivery] = useState(null);
  const [product, setProduct] = useState('');

  function handleSearch(_product) {
    console.tron.log(product);
    setProduct(_product);
  }

  function handleModal(delivery) {
    setCurrentDelivery(delivery);
    setShow(true);
  }

  function handleClickOutside() {
    setShow(false);
  }

  async function loadDeliveries(page = 1) {
    const response = await api.get(`/delivery?page=${page}&q=${product}`);

    const data = response.data.rows.map((delivery) => {
      const { name } = delivery.deliveryman;

      delivery.deliveryman.slug = generateSlug(name);
      delivery.type = type(delivery);

      delivery.start_date =
        delivery.start_date &&
        format(parseISO(delivery.start_date), 'dd/MM/yyyy');
      delivery.canceled_at =
        delivery.canceled_at &&
        format(parseISO(delivery.canceled_at), 'dd/MM/yyyy');
      delivery.end_date =
        delivery.end_date && format(parseISO(delivery.end_date), 'dd/MM/yyyy');

      return {
        ...delivery,
        deliveryman: {
          ...delivery.deliveryman,
        },
      };
    });

    setDeliveries(data);
  }

  async function handleDelete({ id }) {
    if (
      window.confirm('Se você remover, não poderá mais recuperar. Tem certeza?')
    ) {
      try {
        await api.delete(`delivery/${id}`);

        setDeliveries(deliveries.filter((d) => d.id !== id));

        toast.success('Removido com sucesso!');
      } catch (e) {
        toast.error(
          'Ocorreu um erro ao remover encomenda. Tente novamente mais tarde'
        );
      }
    }
  }

  useEffect(() => {
    loadDeliveries();
  }, [product]);

  return (
    <>
      <Container>
        <header>
          <strong>Gerenciando encomendas</strong>
        </header>
        <ActionList>
          <SearchInput
            placeholder="Buscar por encomendas"
            onEnter={handleSearch}
          />
          <button
            type="button"
            onClick={() => history.push('/delivery/create')}
          >
            <MdAdd size={24} color="#fff" />
            <span>Cadastrar</span>
          </button>
        </ActionList>
        <Table>
          <thead>
            <tr>
              <th width="5%">ID</th>
              <th width="20%">Destinatário</th>
              <th width="20%">Entregador</th>
              <th width="15%">Cidade</th>
              <th width="15%">Estado</th>
              <th width="12%">Status</th>
              <th width="7%">Ações</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>#{delivery.id < 10 ? `0${delivery.id}` : delivery.id}</td>
                <td>{delivery.recipient.name}</td>
                <td>
                  <Profile>
                    {delivery.deliveryman.avatar ? (
                      <img
                        src={delivery.deliveryman.avatar.url}
                        alt={delivery.deliveryman.name}
                      />
                    ) : (
                      <div>{delivery.deliveryman.slug}</div>
                    )}
                    {delivery.deliveryman.name}
                  </Profile>
                </td>
                <td>{delivery.recipient.city}</td>
                <td>{delivery.recipient.state}</td>
                <td>
                  <DeliveryStatus type={delivery.type} />
                </td>
                <td>
                  <Dropdown>
                    <MdMoreHoriz size={24} color="#C6C6C6" />
                    <DropdownContent>
                      <a href="#modal" onClick={() => handleModal(delivery)}>
                        <MdVisibility size={10} color="#8E5BE8" />
                        Visualizar
                      </a>
                      <Link to={`/delivery/edit/${delivery.id}`}>
                        <MdCreate size={10} color="#4D85EE" />
                        Editar
                      </Link>
                      <Link
                        href="#delete"
                        onClick={() => handleDelete(delivery)}
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
      </Container>

      <Modal ref={refModal} show={show} onClickOutside={handleClickOutside}>
        {currentDelivery && (
          <DeliveryInformation>
            <strong>Informações da encomenda</strong>
            <Street>{currentDelivery.recipient.street}</Street>
            <CityAndState>
              {currentDelivery.recipient.city} -{' '}
              {currentDelivery.recipient.state}
            </CityAndState>
            <Zip>{currentDelivery.recipient.zip_code}</Zip>
            <HorizontalLine />
            <strong>Datas</strong>
            <Date>
              <strong>Retirada:</strong>
              {currentDelivery.start_date || 'Não iniciada!'}
            </Date>
            <Date>
              <strong>Entrega:</strong>
              {currentDelivery.end_date || 'Não finalizada!'}
            </Date>
            <HorizontalLine />
            <strong>Assinatura do destinatário</strong>
            {currentDelivery.signature ? (
              <img src={currentDelivery.signature.url} alt="Assinatura" />
            ) : (
              <p>Sem imagem</p>
            )}
          </DeliveryInformation>
        )}
      </Modal>
    </>
  );
}

Delivery.propTypes = {
  history: PropTypes.shape().isRequired,
};
