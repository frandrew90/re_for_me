/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';

// import PropTypes from 'prop-types';
import Tutor from './Tutor/Tutor';
import BigButton from '../common/BigButton/BigButton';
import Paper from '../common/Paper/Paper';
import TutorForm from './TutorForm/TutorForm';
import Loader from '../common/Loader/Loader';
import Skeleton from '../common/Skeleton/Skeleton';
import * as api from '../../services/api';
import addIcon from '../../images/plus.svg';
import cancelIcon from '../../images/cancel-circle.svg';

const API_ENDPOINT = 'tutors';

const TutorsBlock = () => {
  const [tutors, setTutors] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTutor, setNewTutor] = useState(null);
  // api request status
  const [firstLoading, setFirstLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //FETCH TUTORS

  useEffect(() => {
    const fetchTutors = async () => {
      setFirstLoading(true);
      setLoading(true);

      try {
        const tutors = await api.getData(API_ENDPOINT);
        setTutors(tutors);
        // console.log(tutors);
      } catch (error) {
        setError(error.message);
      } finally {
        setFirstLoading(false);
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  //ADD TUTOR

  useEffect(() => {
    if (!newTutor) return;

    const addTutor = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);
        setTutors(prevTutors => [...prevTutors, savedTutor]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setIsFormOpen(false);
        setNewTutor(null);
      }
    };
    addTutor();
  }, [newTutor]);

  // //FETCH TUTORS with abortcontroller

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   const fetchTutors = async () => {
  //     setFirstLoading(true);
  //     setLoading(true);

  //     try {
  //       const tutors = await api.getData(API_ENDPOINT, { signal });
  //       setTutors(tutors);
  //       console.log(tutors);
  //     } catch (error) {
  //       if (!signal.aborted) {
  //         setError(error.message);
  //       }
  //     } finally {
  //       if (!signal.aborted) {
  //         setFirstLoading(false);
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchTutors();

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  // //ADD TUTOR with light version of abortcontroller

  // useEffect(() => {
  //   if (!newTutor) return;

  //   let isTutorsMounted = true;
  //   const addTutor = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);
  //       if (isTutorsMounted) {
  //         setTutors(prevTutors => [...prevTutors, savedTutor]);
  //       }
  //     } catch (error) {
  //       if (isTutorsMounted) {
  //         setError(error.message);
  //       }
  //     } finally {
  //       if (isTutorsMounted) {
  //         setLoading(false);
  //         setIsFormOpen(false);
  //         setNewTutor(null);
  //       }
  //     }
  //   };
  //   addTutor();

  //   return () => {
  //     isTutorsMounted = false;
  //   };
  // }, [newTutor]);

  const toggleForm = () => {
    setIsFormOpen(prevIsFormOpen => !prevIsFormOpen);
  };

  const noTutors = !firstLoading && !tutors.length;

  return (
    <div>
      {loading && <Loader />}

      {firstLoading && <Skeleton />}

      {!!tutors.length && (
        <ul>
          {tutors.map(tutor => (
            <li key={tutor.id} css={{ marginBottom: '24px' }}>
              <Paper>
                <Tutor tutor={tutor} />
              </Paper>
            </li>
          ))}
        </ul>
      )}

      {noTutors && <h4> No tutors yet!</h4>}

      {isFormOpen && <TutorForm onSubmit={setNewTutor} />}

      {error && <ErrorMsg message={error} />}

      <BigButton
        icon={isFormOpen ? cancelIcon : addIcon}
        text={isFormOpen ? 'Cancel adding' : 'Add Tutor'}
        onClickBtn={toggleForm}
        disabled={loading}
      />
    </div>
  );
};

export default TutorsBlock;
