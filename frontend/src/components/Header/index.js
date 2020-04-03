import React from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Content, Profile } from './styles';

import { persistor } from '~/store';

import logo from '~/assets/logo.png';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);

  function handleLogout() {
    persistor.purge().then(window.location.reload());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gobarber" />
          <div />
          <NavLink to="/delivery" activeClassName="is-active">
            ENCOMENDAS
          </NavLink>
          <NavLink to="/deliveryman" activeClassName="is-active">
            ENTREGADORES
          </NavLink>
          <NavLink to="/recipient" activeClassName="is-active">
            DESTINATÁRIOS
          </NavLink>
          <NavLink to="/problem" activeClassName="is-active">
            PROBLEMAS
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <a href="#logout" onClick={() => handleLogout()}>
                sair do sistema
              </a>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
