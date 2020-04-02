import React, { useState, useRef, useEffect } from 'react';

import { MdAdd, MdMoreHoriz, MdDeleteForever, MdCreate } from 'react-icons/md';

import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container } from './styles';

import DeliveryStatus from '~/components/DeliveryStatus';
import { Dropdown, DropdownContent } from '~/components/Dropdown/styles';

import SearchInput from '~/components/ActionList/SearchInput';
import ActionList from '~/components/ActionList';
import Table from '~/components/Table';

export default function Deliveryman() {
  return (
    <Container>
      <header>
        <strong>Gerenciando destinatários</strong>
      </header>

      <ActionList>
        <SearchInput placeholder="Buscar por destinatários" />

        <button type="button">
          <MdAdd size={24} color="#fff" />
          <span>Cadastrar</span>
        </button>
      </ActionList>

      <Table>
        <thead>
          <tr>
            <th width="5%">ID</th>
            <th width="20%">Nome</th>
            <th width="20%">Endereço</th>
            <th width="7%">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>JanuaryJanuary</td>
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
