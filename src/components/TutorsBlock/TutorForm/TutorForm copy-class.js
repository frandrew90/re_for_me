import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BigButton from '../../common/BigButton/BigButton';
import Paper from '../../common/Paper/Paper';
import s from './TutorForm.module.css';

const citiesOptions = [
  {
    label: 'Choose city*',
    value: '',
  },
  {
    label: 'Odessa',
    value: 'Odessa',
  },
  {
    label: 'Berlin',
    value: 'Berlin',
  },
  {
    label: 'Lviv',
    value: 'Lviv',
  },
];

const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
};

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  patronymic: '',
  gender: '',
  phone: '',
  email: '',
  city: '',
  options: '',
  isFullTime: false,
};

class TutorForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = e => {
    const { name, value, type, checked } = e.target;
    const isCheckbox = type === 'checkbox';
    this.setState({ [name]: isCheckbox ? checked : value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const {
      firstName,
      lastName,
      patronymic,
      gender,
      phone,
      email,
      city,
      options,
      isFullTime,
    } = this.state;

    // const isAddBtnDisabled = Object.keys(this.state).some(inputName => {
    //   if (inputName === 'isFullTime') {
    //     return false;
    //   }
    //   return !this.state[inputName];
    // });

    // const isAddBtnDisabled = Object.keys(this.state).some(
    //   inputName => inputName !== 'isFullTime' && !this.state[inputName],
    // );

    const isAddBtnDisabled = Object.values(this.state).some(
      value => typeof value !== 'boolean' && !value,
    );

    // const isAddBtnDisabled = Object.values(this.state).some(value => {
    //   if (typeof value === 'boolean') {
    //     return false;
    //   }
    //   return !value;
    // });

    return (
      <div className={s.container}>
        <Paper>
          <div className={s.inner}>
            <h4 className="formName">Add Tutor</h4>
            <form onSubmit={this.handleSubmit}>
              <input
                name="lastName"
                value={lastName}
                type="text"
                placeholder="Last name*"
                required
                onChange={this.handleChange}
              />
              <input
                name="firstName"
                value={firstName}
                type="text"
                placeholder="First name*"
                required
                onChange={this.handleChange}
              />
              <input
                name="patronymic"
                value={patronymic}
                type="text"
                placeholder="Patronymic*"
                required
                onChange={this.handleChange}
              />
              <input
                name="phone"
                value={phone}
                type="tel"
                placeholder="Phone number*"
                required
                onChange={this.handleChange}
              />
              <input
                name="email"
                value={email}
                type="email"
                placeholder="Email*"
                required
                onChange={this.handleChange}
              />
              {/* <input
                name="city"
                // value={}
                type="text"
                placeholder="City*"
                required
                onChange={this.handleChange}
              /> */}
              <input
                name="options"
                value={options}
                type="text"
                placeholder="Kind of activity*"
                required
                onChange={this.handleChange}
              />

              <select
                name="city"
                value={city}
                onChange={this.handleChange}
                className={s.inner}
              >
                {citiesOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <section>
                <h5 className={s.inner}>Sex*</h5>
                <div className={s.radioBtnWrapper}>
                  <label className={s.inner}>Male</label>
                  <input
                    className={s.radioBtn}
                    type="radio"
                    checked={gender === GENDER.MALE}
                    name="gender"
                    value={GENDER.MALE}
                    onChange={this.handleChange}
                  />
                  <label className={s.inner}>Female</label>
                  <input
                    className={s.radioBtn}
                    type="radio"
                    checked={gender === GENDER.FEMALE}
                    name="gender"
                    value={GENDER.FEMALE}
                    onChange={this.handleChange}
                  />
                </div>
              </section>

              <div className={s.checkboxWrapper}>
                <label className={s.inner}>Full time</label>
                <input
                  className={s.checkbox}
                  name="isFullTime"
                  type="checkbox"
                  checked={isFullTime}
                  onChange={this.handleChange}
                />
              </div>

              <BigButton
                type="submit"
                text="Invite"
                disabled={isAddBtnDisabled}
              />
            </form>
          </div>
        </Paper>
      </div>
    );
  }
}

TutorForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TutorForm;
