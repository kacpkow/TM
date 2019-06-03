import React, { useState } from 'react';
import { Link } from '@reach/router';
import { useSpring, animated, config } from 'react-spring';
import * as Icon from 'react-feather';
import { ICON_SIZE } from '../../config/constants';
import { useUser } from '../../contexts/User';
import Overlay from '../Overlay';
import Portal from '../Portal';

import './style.scss';

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => ({
      className: isCurrent ? 'active' : ''
    })}
  />
);

const Nav = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen(prev => !prev);
  const onClose = () => setIsOpen(false);

  const style = useSpring(
    isOpen
      ? {
        left: 0,
        opacity: 1,
        transform: 'scale(1)',
        pointerEvents: 'auto',
        config: config.gentle
      }
      : {
        left: -150,
        opacity: 0,
        transform: 'scale(1.05)',
        pointerEvents: 'none',
        config: config.gentle
      }
  );

  return (
    <>
      <button type="button" className="nav-trigger" onClick={onToggle}>
        <Icon.Menu size={ICON_SIZE.medium} />
      </button>

      <Portal>
        <Overlay isOpen={isOpen} onClick={onClose} />

        <animated.div className="nav" style={style}>
          <Link onClick={onClose} to="/" className="nav__logo">
            <b>TK</b> Projekt
          </Link>

          <ul>
            <li>
              <NavLink onClick={onClose} to="/">
                Główna
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink onClick={onClose} to="/konto">
                    Moje konto
                  </NavLink>
                </li>

                {user.is_staff && (
                  <li>
                    <NavLink onClick={onClose} to="/aktywacja">
                      Aktywacja kont
                    </NavLink>
                  </li>
                )}

                <li>
                  <NavLink onClick={onClose} to="/edytor">
                    Dodaj grafikę
                  </NavLink>
                </li>

                <li>
                  <NavLink onClick={onClose} to="/pliki">
                    Manager plików
                  </NavLink>
                </li>

                <li>
                  <NavLink onClick={onClose} to="/tablety">
                    Tablety
                  </NavLink>
                </li>

                <li>
                  <NavLink onClick={onClose} to="/wyloguj">
                    Wyloguj się
                  </NavLink>
                </li>
              </>
            )}

            {!user && (
              <>
                <li>
                  <NavLink onClick={onClose} to="/zaloguj">
                    Logowanie
                  </NavLink>
                </li>

                <li>
                  <NavLink onClick={onClose} to="/zarejestruj">
                    Rejestracja
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </animated.div>
      </Portal>
    </>
  );
};

export default Nav;
