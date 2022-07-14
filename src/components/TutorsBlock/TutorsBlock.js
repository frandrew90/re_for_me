/** @jsxImportSource @emotion/react */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tutor from './Tutor/Tutor';
import BigButton from '../common/BigButton/BigButton';
import Paper from '../common/Paper/Paper';
import TutorForm from './TutorForm/TutorForm';
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

class TutorsBlock extends Component {
  state = {
    isFormOpen: false,
  };

  toggleForm = () => {
    this.setState(prevState => ({
      isFormOpen: !prevState.isFormOpen,
    }));
  };

  render() {
    return (
      <div css={{ position: 'relative', marginBottom: '32px' }}>
        <ul>
          {this.props.tutors.map(tutor => (
            <li key={tutor.email} css={{ marginBottom: '24px' }}>
              <Paper>
                <Tutor tutor={tutor} />
              </Paper>
            </li>
          ))}
        </ul>

        {this.state.isFormOpen && <TutorForm />}

        <BigButton
          icon={this.state.isFormOpen ? cancelIcon : addIcon}
          text={this.state.isFormOpen ? 'Cancel' : 'Add Tutor'}
          onClickBtn={this.toggleForm}
        />
      </div>
    );
  }
}

TutorsBlock.propTypes = {
  tutors: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      patronymic: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      city: PropTypes.string,
      options: PropTypes.string,
    }),
  ).isRequired,
};

export default TutorsBlock;
