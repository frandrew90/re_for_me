import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRootRef = document.querySelector('#modal-root');

const Modal = ({ onClose, icon, title, children }) => {
  useEffect(() => {
    const onEscPress = e => {
      if (e.code === 'Escape') {
        console.log('Escape');
        onClose();
      }
    };

    window.addEventListener('keydown', onEscPress);
    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [onClose]);

  // useEffect(() => {
  //   console.log('useEffect ');
  //   return () => {
  //     console.log('unmount ');
  //   };
  // });

  // componentDidMount:
  // useEffect(() => { }, []);

  // componentDidMount + componentDidUpdate:
  // useEffect(() => { },);

  // componentDidMount + componentDidUpdate(следит только за children):
  // useEffect(() => { }, [children]);

  // componentDidMount + componentDidUpdate + componentWillUnmount (то что в return):
  // useEffect(() => {
  //   return () => {};
  // }, []);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <>
      <div className={s.backdrop} onClick={handleBackdropClick}>
        <div className={s.modal}>
          <header className="header">
            <button className={s.closeBtn} onClick={onClose} aria-label="close">
              &times;
            </button>
          </header>

          <div className={s.content}>
            <div className={s.lead}>
              <div className={s.imgWrapper}>
                <img src={icon} alt={title} />
              </div>
              <h3 className="heading">{title}</h3>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>,
    modalRootRef,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
