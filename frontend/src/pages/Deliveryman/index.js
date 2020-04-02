import React, { useState, useRef, useEffect } from 'react';

import { MdAdd, MdMoreHoriz, MdDeleteForever, MdCreate } from 'react-icons/md';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '~/services/api';
import image from '~/assets/Image 1.png';

import { Container } from './styles';

import ActionList from '~/components/ActionList';
import Table from '~/components/Table';
import Profile from '~/components/Profile';
import DeliveryStatus from '~/components/DeliveryStatus';
import { Dropdown, DropdownContent } from '~/components/Dropdown/styles';
import SearchInput from '~/components/ActionList/SearchInput';

export default function Deliveryman({ history }) {
  return (
    <Container>
      <header>
        <strong>Gerenciando entregadores</strong>
      </header>
      <ActionList>
        <SearchInput placeholder="Buscar por entregadores" />

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
            <th width="5%">ID</th>
            <th width="20%">Foto</th>
            <th width="20%">Nome</th>
            <th width="15%">Email</th>
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
            <td>
              <DeliveryStatus />
            </td>
            <td>
              <Dropdown>
                <MdMoreHoriz size={24} color="#C6C6C6" />
                <DropdownContent>
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
            <td>
              <DeliveryStatus />
            </td>
            <td>
              <Dropdown>
                <MdMoreHoriz size={24} color="#C6C6C6" />
                <DropdownContent>
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
  );
}

Deliveryman.propTypes = {
  history: PropTypes.shape().isRequired,
};
