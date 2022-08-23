import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import BigButton from '../../common/BigButton/BigButton';
import Loader from '../../common/Loader/Loader';
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg';
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

const textValidation = {
  required: 'this field is required',
  minLength: {
    value: 2,
    message: 'Field should have more then 1 letter',
  },
  maxLength: {
    value: 20,
    message: 'Field should have less then 21 letters',
  },
};

const emailValidation = {
  required: 'Email is required',
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: 'Invalid email address',
  },
};

const TutorForm = ({ closeForm, onAddTutor }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  console.log(errors);

  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [patronymic, setPatronymic] = useState('');
  // const [gender, setGender] = useState('');
  // const [phone, setPhone] = useState('');
  // const [email, setEmail] = useState('');
  // const [city, setCity] = useState('');
  // const [options, setOptions] = useState('');
  // const [isFullTime, setIsFullTime] = useState(false);
  // with Redux
  // api request status
  const [newTutor, setNewTutor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = data => {
    console.log(data);
    // setNewTutor({
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
              {...register('firstName', {
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
            />
            {errors.firstName?.type === 'required' && (
              <ErrorMsg message="First name is required" />
            )}
            {errors.firstName?.type === 'minLength' && (
              <ErrorMsg message="First name Min length is 2" />
            )}
            {errors.firstName?.type === 'maxLength' && (
              <ErrorMsg message="First name Max length is 20" />
            )}
            <input
              className={s.formInput}
              type="text"
              placeholder="Last name*"
              {...register('lastName', textValidation)}
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
              {...register('phone', {
                required: true,
                pattern:
                  /^((8|\+38)[- ]?)?\(?(039|044|050|063|066|067|068|073|091|092|093|094|095|096|097|098|099)\)?([- ]?)?[\d\- ]{7,10}$/,
              })}
            />
            {!!errors.phone && (
              <ErrorMsg message="Please, enter your phone number(+380123456789)" />
            )}
            <input
              className={s.formInput}
              type="email"
              placeholder="Email*"
              {...register('email', emailValidation)}
            />
            {errors.email && <ErrorMsg message={errors.email.message} />}
            <input
              className={s.formInput}
              type="text"
              placeholder="Kind of activity*"
              {...register('options')}
            />

            <select
              className={s.inner}
              {...register('city', {
                required: true,
              })}
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
                  value={GENDER.MALE}
                  {...register('gender', {
                    required: true,
                  })}
                />
                <label className={s.inner}>Female</label>
                <input
                  className={s.radioBtn}
                  type="radio"
                  value={GENDER.FEMALE}
                  {...register('gender', {
                    required: true,
                  })}
                />
              </div>
            </section>

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

const mapDispatchToProps = dispatch => ({
  onAddTutor: tutor => dispatch(addTutor(tutor)),
});

export default connect(null, mapDispatchToProps)(TutorForm);
