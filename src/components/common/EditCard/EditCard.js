import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../BigButton/BigButton';
import { nanoid } from 'nanoid';
import s from './EditCard.module.css';

const EditCard = ({ label, onSave, inputValue }) => {
  const [input, setInput] = useState(inputValue);

  const inputRef = useRef(null);

  // ================================================
  //   Реализация чистого componentDidUpdate без первого рендера (componentDidMount)
  // const isFirstRender = useRef(true);

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     console.log('first');
  //     return;
  //   }
  //   console.log('second');
  // }, [input]);
  // ================================================

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = e => setInput(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSave(input);
    reset();
  };

  const reset = () => setInput('');

  // const inputId = useRef(nanoid());
  const { current: inputId } = useRef(nanoid());
  // console.log(inputId);

  return (
    <>
      <form onSubmit={handleSubmit} className={s.form}>
        <label
          // htmlFor={inputId.current}
          htmlFor={inputId}
        >
          {label}
          <span className={s.red}>*</span>
          <input
            ref={inputRef}
            className={s.cityInput}
            // id={inputId.current}
            id={inputId}
            type="text"
            value={input}
            onChange={handleChange}
          />
        </label>
        <div className={s.btnWrapper}>
          <BigButton type="submit" text={'Save'} disabled={!input} />
        </div>
      </form>
    </>
  );
};

EditCard.propTypes = {
  label: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
};

export default EditCard;
