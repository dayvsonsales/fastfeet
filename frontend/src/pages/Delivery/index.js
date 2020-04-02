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

import image from '~/assets/Image 1.png';
import SearchInput from '~/components/ActionList/SearchInput';

export default function Delivery({ history }) {
  const refModal = useRef(null);
  const [show, setShow] = useState(false);

  function handleClickOutside() {
    setShow(false);
  }

  return (
    <>
      <Container>
        <header>
          <strong>Gerenciando encomendas</strong>
        </header>
        <ActionList>
          <SearchInput placeholder="Buscar por encomendas" />
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
            <tr>
              <td>1</td>
              <td>JanuaryJanuary</td>
              <td>
                <Profile>
                  <div>JD</div>
                  John Doe
                </Profile>
              </td>
              <td>$100</td>
              <td>January</td>
              <td>
                <DeliveryStatus />
              </td>
              <td>
                <Dropdown>
                  <MdMoreHoriz size={24} color="#C6C6C6" />
                  <DropdownContent>
                    <a href="#d" onClick={() => setShow(true)}>
                      <MdVisibility size={10} color="#8E5BE8" />
                      Visualizar
                    </a>
                    <Link to="/edit">
                      <MdCreate size={10} color="#4D85EE" />
                      Editar
                    </Link>
                    <Link to="/delete">
                      <MdDeleteForever size={10} color="#DE3B3B" />
                      Excluir
                    </Link>
                  </DropdownContent>
                </Dropdown>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>JanuaryJanuary</td>
              <td>
                <Profile>
                  <img src={image} alt="Assinatura" />
                  John Doe
                </Profile>
              </td>
              <td>$100</td>
              <td>January</td>
              <td>
                <DeliveryStatus />
              </td>
              <td>
                <Dropdown>
                  <MdMoreHoriz size={24} color="#C6C6C6" />
                  <DropdownContent>
                    <a href="#ss">
                      <MdVisibility size={10} color="#8E5BE8" />
                      Visualizar
                    </a>
                    <Link to="/edit">
                      <MdCreate size={10} color="#4D85EE" />
                      Editar
                    </Link>
                    <Link to="/delete">
                      <MdDeleteForever size={10} color="#DE3B3B" />
                      Excluir
                    </Link>
                  </DropdownContent>
                </Dropdown>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>

      <Modal ref={refModal} show={show} onClickOutside={handleClickOutside}>
        <DeliveryInformation>
          <strong>Informações da encomenda</strong>
          <Street>Rua Ddadad </Street>
          <CityAndState>Maceió - AL</CityAndState>
          <Zip>57060-160</Zip>
          <HorizontalLine />
          <strong>Datas</strong>
          <Date>
            <strong>Retirada:</strong>24/05/2010
          </Date>
          <Date>
            <strong>Entrega:</strong>27/10/1010
          </Date>
          <HorizontalLine />
          <strong>Assinatura do destinatário</strong>
          <img src={image} alt="Assinatura" />
        </DeliveryInformation>
      </Modal>
    </>
  );
}

Delivery.propTypes = {
  history: PropTypes.shape().isRequired,
};
