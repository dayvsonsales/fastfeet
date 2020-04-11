import React, { useEffect, useState, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';
import { List as Loading } from 'react-content-loader/native';
import {
  Container,
  Background,
  ItemContainer,
  Header,
  Title,
  Problem,
  ProblemText,
  ProblemDate,
} from './styles';
import api from '~/services/api';

export default function ProblemDetails({ route }) {
  const [deliveryProblems, setDeliveryProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = route.params;

  const hasProblems = useMemo(() => deliveryProblems.length > 0);

  async function loadDeliveryProblems() {
    setLoading(true);
    const response = await api.get(`delivery/${id}/problems`);

    const data = response.data.rows.map((problem) => ({
      ...problem,
      formatted_created_at: format(parseISO(problem.createdAt), 'dd/MM/yyyy'),
    }));

    setLoading(false);
    setDeliveryProblems(data);
  }

  useEffect(() => {
    if (id) {
      loadDeliveryProblems();
    }
  }, [id]);

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <ItemContainer>
          <Header>
            <Title>Encomenda {id}</Title>
          </Header>
          {loading ? (
            <Loading style={{ marginTop: 50, alignItems: 'center' }} />
          ) : hasProblems ? (
            deliveryProblems.map((problem) => (
              <Problem key={problem.id}>
                <ProblemText>{problem.description}</ProblemText>
                <ProblemDate>{problem.formatted_created_at}</ProblemDate>
              </Problem>
            ))
          ) : (
            <Problem>
              <ProblemText>Sem problemas registrados</ProblemText>
            </Problem>
          )}
        </ItemContainer>
      </Container>
    </Background>
  );
}

ProblemDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }),
};
