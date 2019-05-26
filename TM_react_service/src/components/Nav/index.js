import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import UserContext from '../../contexts/User';
import Overlay from '../Overlay';
import Portal from '../Portal';

import './style.scss';

export default () => {
  const { user } = UserContext();
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen(prev => !prev);
  const onClose = () => setIsOpen(false);

  const style = useSpring(
    isOpen
      ? {
        left: 0,
        opacity: 1,
        pointerEvents: 'auto'
      }
      : {
        left: -50,
        opacity: 0,
        pointerEvents: 'none'
      }
  );

  return (
    <>
      <button type="button" className="nav-trigger" onClick={onToggle} />

      <Portal>
        <Overlay isOpen={isOpen} onClick={onClose} />

        <animated.div className="nav" style={style}>
          <Link onClick={onClose} to="/" className="nav__logo">
            <b>TK</b> Projekt
          </Link>

          <ul>
            <li>
              <NavLink onClick={onClose} to="/" exact>
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

                {user.isStaff && (
                  <>
                    <li>
                      <NavLink onClick={onClose} to="/aktywuj">
                        Aktywacja kont
                      </NavLink>
                    </li>
                  </>
                )}

                <li>
                  <NavLink onClick={onClose} to="/edytor">
                    Dodaj grafikę
                  </NavLink>
                </li>

                <li>
                  <NavLink onClick={onClose} to="/upload">
                    Manager plików
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
