import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BigButton from '../../common/BigButton/BigButton';
import Paper from '../../common/Paper/Paper';
import s from './TutorForm.module.css';

class TutorForm extends Component {
  render() {
    return (
      <div className={s.container}>
        <Paper>
          <div className={s.inner}>
            <h4 className="formName">Add Tutor</h4>
            <form onSubmit={this.handleSubmit}>
              <input
                name="lastName"
                type="text"
                placeholder="Last name*"
                required
              />
              <input
                name="firstName"
                type="text"
                placeholder="First name*"
                required
              />
              <input
                name="patronymic"
                type="text"
                placeholder="Patronymic*"
                required
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone number*"
                required
              />
              <input name="email" type="email" placeholder="Email*" required />
              <input name="city" type="text" placeholder="City*" required />
              <input
                name="options"
                type="text"
                placeholder="Kind of activity*"
                required
              />

              <BigButton type="submit" text="Invite" disabled />
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
