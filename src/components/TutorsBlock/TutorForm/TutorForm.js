import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import BigButton from '../../common/BigButton/BigButton';
import Loader from '../../common/Loader/Loader';
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg';
import Paper from '../../common/Paper/Paper';
// import * as api from '../../../services/api';
// import { addTutor } from '../../../redux/tutors/tutorsOperations';
import { tutorsSelectors, tutorsOperations } from '../../../redux/tutors/index';

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

// const API_ENDPOINT = 'tutors';

const phoneRegExp =
  /^((8|\+38)[- ]?)?\(?(039|044|050|063|066|067|068|073|091|092|093|094|095|096|097|098|099)\)?([- ]?)?[\d\- ]{7,10}$/;

const schema = yup
  .object({
    firstName: yup
      .string()
      .min(2, 'First name Min length is 2')
      .max(20, 'First name Max length is 20')
      .required('First name is required'),
    lastName: yup
      .string()
      .min(2, 'Last name Min length is 2')
      .max(20, 'Last name Max length is 20')
      .required('Last name is required'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Invalid phone number')
      .required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    city: yup.string().required('City is required'),
    gender: yup.string().nullable().required('Gender is required'),
  })
  .required();

const TutorForm = ({ closeForm, onAddTutor, loading, error }) => {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const [newTutor, setNewTutor] = useState(null);

  const onSubmit = data => {
    setNewTutor(data);
    reset();
  };

  //ADD TUTOR

  useEffect(() => {
    if (!newTutor) return;

    const addNewTutor = async () => {
      await onAddTutor(newTutor);
      setNewTutor(null);
      closeForm();
    };
    addNewTutor();
  }, [closeForm, newTutor, onAddTutor]);

  return (
    <div className={s.container}>
      {loading && <Loader />}
      <Paper>
        <div className={s.inner}>
          <h4 className="formName">Add Tutor</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className={s.formInput}
              type="text"
              placeholder="First name*"
              {...register('firstName')}
            />
            {errors.firstName && (
              <ErrorMsg message={errors.firstName.message} />
            )}
            <input
              className={s.formInput}
              type="text"
              placeholder="Last name*"
              {...register('lastName')}
            />
            {errors.lastName && <ErrorMsg message={errors.lastName.message} />}
            <input
              className={s.formInput}
              type="text"
              placeholder="Patronymic*"
              {...register('patronymic')}
            />
            <input
              className={s.formInput}
              type="tel"
              placeholder="Phone number*"
              {...register('phone')}
            />
            {!!errors.phone && <ErrorMsg message={errors.phone.message} />}
            <input
              className={s.formInput}
              type="email"
              placeholder="Email*"
              {...register('email')}
            />
            {errors.email && <ErrorMsg message={errors.email.message} />}
            <input
              className={s.formInput}
              type="text"
              placeholder="Kind of activity*"
              {...register('options')}
            />

            <select className={s.inner} {...register('city')}>
              {citiesOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            {errors.city && <ErrorMsg message={errors.city.message} />}

            <section>
              <h5 className={s.inner}>Sex*</h5>
              <div className={s.radioBtnWrapper}>
                <label className={s.inner}>Male</label>
                <input
                  className={s.radioBtn}
                  type="radio"
                  value={GENDER.MALE}
                  {...register('gender')}
                />
                <label className={s.inner}>Female</label>
                <input
                  className={s.radioBtn}
                  type="radio"
                  value={GENDER.FEMALE}
                  {...register('gender')}
                />
              </div>
            </section>
            {errors.gender && <ErrorMsg message={errors.gender.message} />}

            <div className={s.checkboxWrapper}>
              <label className={s.inner}>Full time</label>
              <input
                className={s.checkbox}
                type="checkbox"
                {...register('isFullTime')}
              />
            </div>

            {error && <ErrorMsg message={error} />}

            <BigButton type="submit" text="Invite" />
          </form>
        </div>
      </Paper>
    </div>
  );
};

TutorForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: tutorsSelectors.getLoading(state),
  error: tutorsSelectors.getError(state),
});

const mapDispatchToProps = dispatch => ({
  onAddTutor: tutor => dispatch(tutorsOperations.addTutor(tutor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorForm);
