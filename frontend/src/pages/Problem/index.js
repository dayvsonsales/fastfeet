import React, { useState, useRef, useEffect } from 'react';

import { MdMoreHoriz, MdDeleteForever, MdCreate } from 'react-icons/md';

import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container, ProblemInformation } from './styles';

import { Dropdown, DropdownContent } from '~/components/Dropdown/styles';

import Modal from '~/components/Modal';
import Table from '~/components/Table';

import Paginator from '~/components/Paginator';

export default function Problem() {
  const refModal = useRef(null);
  const [show, setShow] = useState(false);

  const [deliveriesProblems, setDeliveryProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState();

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  function handleModal(deliveryProblem) {
    setCurrentProblem(deliveryProblem);
    setShow(true);
  }

  function handleClickOutside() {
    setShow(false);
  }

  async function loadDeliveryProblems(_page = 1) {
    const response = await api.get(`delivery-problems?page=${_page}`);

    setTotal(response.data.count);
    setPage(_page);

    setDeliveryProblems(response.data.rows);
  }

  async function handleCancel({ id }) {
    if (
      window.confirm(
        'Se você cancelar, não poderá mais recuperar. Tem certeza?'
      )
    ) {
      try {
        await api.delete(`/problem/${id}/cancel-delivery`);

        setDeliveryProblems(deliveriesProblems.filter((d) => d.id !== id));

        toast.success('Removido com sucesso!');
      } catch (e) {
        toast.error(
          'Ocorreu um erro ao remover encomenda. Tente novamente mais tarde'
        );
      }
    }
  }

  useEffect(() => {
    loadDeliveryProblems();
  }, []);

  return (
    <>
      <Container>
        <header>
          <strong>Problemas na entrega</strong>
        </header>
        <Table>
          <thead>
            <tr>
              <th width="20%">Encomenda</th>
              <th width="75%">Problema</th>
              <th width="5%">Ações</th>
            </tr>
          </thead>

          <tbody>
            {deliveriesProblems.map((deliveryProblem) => (
              <tr>
                <td>
                  #
                  {deliveryProblem.delivery.id < 10
                    ? `0${deliveryProblem.delivery.id}`
                    : deliveryProblem.delivery.id}
                </td>
                <td
                  style={{
                    maxWidth: '150px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {deliveryProblem.description}
                </td>
                <td>
                  <Dropdown>
                    <MdMoreHoriz size={24} color="#C6C6C6" />
                    <DropdownContent>
                      <a
                        href="#problem"
                        onClick={() => handleModal(deliveryProblem)}
                      >
                        <MdCreate size={10} color="#4D85EE" />
                        Visualizar
                      </a>
                      <a
                        href="#delete"
                        onClick={() => handleCancel(deliveryProblem)}
                      >
                        <MdDeleteForever size={10} color="#DE3B3B" />
                        Cancelar encomenda
                      </a>
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
          handlePaginator={loadDeliveryProblems}
        />
      </Container>

      <Modal ref={refModal} show={show} onClickOutside={handleClickOutside}>
        {currentProblem && (
          <ProblemInformation>
            <strong>VISUALIZAR PROBLEMA</strong>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
              mauris et felis eleifend elementum vel quis lectus. Vivamus
              dapibus nisi augue, vitae ultrices ligula elementum at. Proin ut
              metus in mi tincidunt vestibulum a a felis. Aenean dictum libero
              eu urna tristique vestibulum. Fusce feugiat justo et augue
              facilisis, sit amet ornare eros consequat. Suspendisse semper
              risus feugiat nisl commodo, sed mollis neque auctor. Nullam eu
              fringilla lectus. Phasellus sed sapien sed turpis imperdiet
              maximus. Aenean ante nulla, bibendum non facilisis at, facilisis
              eget ex. In ut quam et tellus aliquet tincidunt.
            </span>
          </ProblemInformation>
        )}
      </Modal>
    </>
  );
}
