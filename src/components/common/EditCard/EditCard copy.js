import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../BigButton/BigButton';
import { nanoid } from 'nanoid';
import s from './EditCard.module.css';

class EditCard extends Component {
  state = {
    input: this.props.inputValue,
  };

  handleChange = e => this.setState({ input: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSave(this.state.input);
    this.reset();
  };

  reset = () => {
    this.setState({ input: '' });
  };

  inputId = nanoid();

  render() {
    const { input } = this.state;
    const { label } = this.props;

    return (
      <>
        <form onSubmit={this.handleSubmit} className={s.form}>
          <label htmlFor={this.editInputId}>
            {label}
            <span className={s.red}>*</span>
            <input
              className={s.cityInput}
              id={this.inputId}
              type="text"
              value={input}
              onChange={this.handleChange}
            />
          </label>
          <div className={s.btnWrapper}>
            <BigButton type="submit" text={'Save'} disabled={!input} />
          </div>
        </form>
      </>
    );
  }
}

EditCard.propTypes = {
  label: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
};

export default EditCard;
