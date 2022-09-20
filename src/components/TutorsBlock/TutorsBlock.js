/** @jsxImportSource @emotion/react */

import { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import Tutor from './Tutor/Tutor';
import BigButton from '../common/BigButton/BigButton';
import Paper from '../common/Paper/Paper';
import TutorForm from './TutorForm/TutorForm';
import Loader from '../common/Loader/Loader';
import Skeleton from '../common/Skeleton/Skeleton';
import { tutorsSelectors, tutorsOperations } from '../../redux/tutors';
import addIcon from '../../images/plus.svg';
import cancelIcon from '../../images/cancel-circle.svg';

const TutorsBlock = ({ tutors, onGetTutors, loading, error }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  //FETCH TUTORS

  useEffect(() => {
    onGetTutors();
  }, [onGetTutors]);

  const toggleForm = useCallback(() => {
    setIsFormOpen(prevIsFormOpen => !prevIsFormOpen);
  }, []);

  // const noTutors = !loading && tutors.length===0;
  const noTutors = !loading && !tutors.length;
  // const showTutors = !loading && tutors.length > 0;
  const showTutors = !loading && !!tutors.length;

  return (
    <div>
      {loading && <Loader />}

      {loading && <Skeleton />}

      {showTutors && (
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

      {isFormOpen && <TutorForm closeForm={toggleForm} />}

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

// Универсальный способ связать РЕДАКС с компонентом
//(в классовых компонентах но также работает в функциональных):

//Получаем состояние
const mapStateToProps = state => ({
  tutors: tutorsSelectors.getTutors(state),
  loading: tutorsSelectors.getFirstLoading(state),
  error: tutorsSelectors.getError(state),
});

//Получаем методы для изменения состояняя:
const mapDispatchToProps = dispatch => ({
  onGetTutors: () => dispatch(tutorsOperations.getTutors()),
});

// const connectTutors = connect(mapStateToProps, mapDispatchToProps);
// export default connectTutors(TutorsBlock);

export default connect(mapStateToProps, mapDispatchToProps)(TutorsBlock);
