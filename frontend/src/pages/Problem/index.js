import React, { useState, useRef, useEffect } from 'react';

import { MdMoreHoriz, MdDeleteForever, MdCreate } from 'react-icons/md';

import { Link } from 'react-router-dom';
import api from '~/services/api';

import image from '~/assets/Image 1.png';

import { Container } from './styles';

import { Dropdown, DropdownContent } from '~/components/Dropdown/styles';

import Modal from '~/components/Modal';
import Table from '~/components/Table';

export default function Problem() {
  const refModal = useRef(null);
  const [show, setShow] = useState(false);

  function handleClickOutside() {
    setShow(false);
  }

  return (
    <>
      <Container>
        <header>
          <strong>Problemas na entrega</strong>
        </header>
        <Table>
          <thead>
            <tr>
              <th width="5%">Encomenda</th>
              <th width="20%">Problema</th>
              <th width="7%">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>JanuaryJanuary</td>
              <td>
                <Dropdown>
                  <MdMoreHoriz size={24} color="#C6C6C6" />
                  <DropdownContent>
                    <a href="#ss" onClick={() => setShow(true)}>
                      <MdCreate size={10} color="#4D85EE" />
                      Visualizar
                    </a>
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
        <strong>VISUALIZAR PROBLEMA</strong>
        Cillum sit reprehenderit est exercitation.Enim laboris ipsum quis Lorem
        pariatur. Non in id do voluptate in magna voluptate magna ut quis
        commodo aliquip. Magna adipisicing qui elit Lorem sit sint labore et
        tempor aliquip cupidatat veniam. Enim officia deserunt ut consectetur
        occaecat anim qui aliquip ipsum. Ut veniam culpa laboris veniam sit.
        Pariatur do dolore excepteur id. Ipsum ad amet officia adipisicing
        incididunt laborum commodo ut occaecat eiusmod anim occaecat quis.
      </Modal>
    </>
  );
}
