/** @jsxImportSource @emotion/react */

import React, { Component } from 'react';
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

// const TutorsBlock = ({ tutors = [] }) => {
//   return (
//     <div css={{ position: 'relative', marginBottom: '32px' }}>
//       <ul>
//         {tutors.map(tutor => (
//           <li key={tutor.email} css={{ marginBottom: '24px' }}>
//             <Paper>
//               <Tutor tutor={tutor} />
//             </Paper>
//           </li>
//         ))}
//       </ul>
//       <BigButton icon={addIcon} text="Add Tutor" />
//     </div>
//   );
// };

const API_ENDPOINT = 'tutors';

class TutorsBlock extends Component {
  state = {
    tutors: [],
    isFormOpen: false,
    newTutor: null,
    loading: false,
    error: null,
    firstLoading: false,
  };

  // Для предотвращения утечки памяти при размонтировании компонента(простой вариант) - пример в AddTutor:
  // isTutorsMounted = false;
  // Для предотвращения утечки памяти при размонтировании компонента(сложный вариант) - пример в FetchTutor:
  // controller = new AbortController();
  // signal = this.controller.signal;

  componentDidMount() {
    // this.isTutorsMounted = true;
    this.setState({ firstLoading: true });
    this.fetchTutors().finally(() => this.setState({ firstLoading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { newTutor } = this.state;
    if (newTutor && prevState.newTutor !== newTutor) {
      this.addTutor();
    }
  }

  componentWillUnmount() {
    // this.isTutorsMounted = false;
    // if (this.controller) {
    //   this.controller.abort();
    // }
  }

  fetchTutors = async () => {
    // this.createSignalAndController();
    // const signal = { signal: this.signal };
    this.setState({ loading: true, error: null });

    try {
      const tutors = await api.getData(
        API_ENDPOINT,
        // signal
      );

      this.setState({ tutors });
    } catch (error) {
      // if (!this.signal.aborted) {
      this.setState({ error: error.message });
      // }
    } finally {
      // if (!this.signal.aborted) {
      this.setState({ loading: false });
      // }
    }
  };

  toggleForm = () => {
    this.setState(prevState => ({
      isFormOpen: !prevState.isFormOpen,
    }));
  };

  confirmAdd = newTutor => {
    this.setState({ newTutor });
  };

  // addTutor = async newTutor => {
  //   // this.setState(prevState => ({
  //   //   tutors: [...prevState.tutors, newTutor],
  //   //   isFormOpen: false,
  //   // }));

  //   const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);

  //   this.setState(prevState => ({
  //     tutors: [...prevState.tutors, savedTutor],
  //     isFormOpen: false,
  //   }));
  // };
  addTutor = async () => {
    this.setState({ loading: true, error: null });
    const { newTutor } = this.state;
    try {
      const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);

      // if (this.isTutorsMounted) {
      this.setState(prevState => ({
        tutors: [...prevState.tutors, savedTutor],
        isFormOpen: false,
        newTutor: null,
      }));
      // }
    } catch (error) {
      // if (this.isTutorsMounted) {
      this.setState({ error: error.message });
      // }
    } finally {
      // if (this.isTutorsMounted) {
      this.setState({ loading: false });
      // }
    }
  };

  // Для предотвращения утечки памяти при размонтировании компонента(сложный вариант) - пример в FetchTutor(продолжение):
  // createSignalAndController = () => {
  //   if (this.controller) {
  //     this.controller.abort();
  //   }
  //   this.controller = new AbortController();
  //   this.signal = this.controller.signal;
  // };

  render() {
    const { tutors, isFormOpen, loading, error, firstLoading } = this.state;

    const noTutors = !firstLoading && !tutors.length;

    return (
      <div>
        {loading && <Loader />}

        {firstLoading && <Skeleton />}

        <ul>
          {tutors.map(tutor => (
            <li key={tutor.id} css={{ marginBottom: '24px' }}>
              <Paper>
                <Tutor tutor={tutor} />
              </Paper>
            </li>
          ))}
        </ul>

        {noTutors && <h4> No tutors yet!</h4>}

        {isFormOpen && <TutorForm onSubmit={this.confirmAdd} />}

        {error && <ErrorMsg message={error} />}

        <BigButton
          icon={isFormOpen ? cancelIcon : addIcon}
          text={isFormOpen ? 'Cancel adding' : 'Add Tutor'}
          onClickBtn={this.toggleForm}
          disabled={loading}
        />
      </div>
    );
  }
}

// TutorsBlock.propTypes = {
//   tutors: PropTypes.arrayOf(
//     PropTypes.shape({
//       firstName: PropTypes.string,
//       lastName: PropTypes.string,
//       patronymic: PropTypes.string,
//       phone: PropTypes.string,
//       email: PropTypes.string,
//       city: PropTypes.string,
//       options: PropTypes.string,
//     }),
//   ).isRequired,
// };

export default TutorsBlock;
