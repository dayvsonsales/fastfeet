import React, { useState, useRef, useEffect } from 'react';

import { MdDeleteForever, MdCreate } from 'react-icons/md';

import { toast } from 'react-toastify';
import { BulletList as Loading } from 'react-content-loader';
import api from '~/services/api';
import { Container, ProblemInformation } from './styles';

import Dropdown from '~/components/Dropdown';

import Modal from '~/components/Modal';
import Table from '~/components/Table';

import Paginator from '~/components/Paginator';

export default function Problem() {
  const refModal = useRef(null);
  const [show, setShow] = useState(false);

  const [deliveriesProblems, setDeliveryProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState();

  const [loading, setLoading] = useState(true);

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
    if (_page < 1) {
      return;
    }

    setLoading(true);

    const response = await api.get(`delivery-problems?page=${_page}`);

    setTotal(response.data.count);
    setPage(_page);

    setLoading(false);

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

        toast.success('Cancelado com sucesso!');
      } catch (e) {
        toast.error('Não foi possível remover problema.');
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
                        <button
                          type="button"
                          onClick={() => handleModal(deliveryProblem)}
                        >
                          <MdCreate size={10} color="#4D85EE" />
                          <span>Visualizar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCancel(deliveryProblem)}
                        >
                          <MdDeleteForever size={10} color="#DE3B3B" />
                          <span>Cancelar encomenda</span>
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
              handlePaginator={loadDeliveryProblems}
            />
          </>
        )}
      </Container>

      <Modal ref={refModal} show={show} onClickOutside={handleClickOutside}>
        {currentProblem && (
          <ProblemInformation>
            <strong>VISUALIZAR PROBLEMA</strong>
            <span>{currentProblem.description}</span>
          </ProblemInformation>
        )}
      </Modal>
    </>
  );
}
