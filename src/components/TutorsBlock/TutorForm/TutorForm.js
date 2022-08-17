import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BigButton from '../../common/BigButton/BigButton';
import Paper from '../../common/Paper/Paper';
import * as api from '../../../services/api';
import { addTutor } from '../../../redux/tutors/tutorsActions';
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

const API_ENDPOINT = 'tutors';

const TutorForm = ({ closeForm, onAddTutor }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [options, setOptions] = useState('');
  const [isFullTime, setIsFullTime] = useState(false);
  // with Redux
  // api request status
  const [newTutor, setNewTutor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    setNewTutor({
      firstName,
      lastName,
      patronymic,
      gender,
      phone,
      email,
      city,
      options,
      isFullTime,
    });
    // onSubmit({
    //   firstName,
    //   lastName,
    //   patronymic,
    //   gender,
    //   phone,
    //   email,
    //   city,
    //   options,
    //   isFullTime,
    // });
    reset();
  };

  const reset = () => {
    setFirstName('');
    setLastName('');
    setPatronymic('');
    setGender('');
    setPhone('');
    setEmail('');
    setCity('');
    setOptions('');
    setIsFullTime(false);
  };

  //ADD TUTOR

  useEffect(() => {
    if (!newTutor) return;

    const addTutor = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);
        onAddTutor(savedTutor);
        // setTutors(prevTutors => [...prevTutors, savedTutor]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        closeForm();
        setNewTutor(null);
      }
    };
    addTutor();
  }, [closeForm, newTutor, onAddTutor]);

  const requiredValues = [
    firstName,
    lastName,
    patronymic,
    gender,
    phone,
    email,
    city,
    options,
  ];
  const isSubmitBtnDisabled = requiredValues.some(value => !value);

  return (
    <div className={s.container}>
      <Paper>
        <div className={s.inner}>
          <h4 className="formName">Add Tutor</h4>
          <form onSubmit={handleSubmit}>
            <input
              name="lastName"
              value={lastName}
              type="text"
              placeholder="Last name*"
              required
              onChange={e => setLastName(e.target.value)}
            />
            <input
              name="firstName"
              value={firstName}
              type="text"
              placeholder="First name*"
              required
              onChange={e => setFirstName(e.target.value)}
            />
            <input
              name="patronymic"
              value={patronymic}
              type="text"
              placeholder="Patronymic*"
              required
              onChange={e => setPatronymic(e.target.value)}
            />
            <input
              name="phone"
              value={phone}
              type="tel"
              placeholder="Phone number*"
              required
              onChange={e => setPhone(e.target.value)}
            />
            <input
              name="email"
              value={email}
              type="email"
              placeholder="Email*"
              required
              onChange={e => setEmail(e.target.value)}
            />

            <input
              name="options"
              value={options}
              type="text"
              placeholder="Kind of activity*"
              required
              onChange={e => setOptions(e.target.value)}
            />

            <select
              name="city"
              value={city}
              onChange={e => setCity(e.target.value)}
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
                  onChange={e => setGender(e.target.value)}
                />
                <label className={s.inner}>Female</label>
                <input
                  className={s.radioBtn}
                  type="radio"
                  checked={gender === GENDER.FEMALE}
                  name="gender"
                  value={GENDER.FEMALE}
                  onChange={e => setGender(e.target.value)}
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
                onChange={e => setIsFullTime(e.target.checked)}
              />
            </div>

            <BigButton
              type="submit"
              text="Invite"
              disabled={isSubmitBtnDisabled}
            />
          </form>
        </div>
      </Paper>
    </div>
  );
};

TutorForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onAddTutor: tutor => dispatch(addTutor(tutor)),
});

export default connect(null, mapDispatchToProps)(TutorForm);
