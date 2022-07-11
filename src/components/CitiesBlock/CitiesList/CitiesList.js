import React from 'react';
import PropTypes from 'prop-types';
import dots from '../../../images/make-group.svg';
import Paper from '../../common/Paper/Paper';

const CitiesList = ({ cities }) => {
  return (
    <ul className="cities-list">
      {cities.map((city, idx) => (
        <li key={idx}>
          <Paper>
            <div className="city">
              <p>{city}</p>
              <button>
                <img src={dots} alt="Menu" />
              </button>
            </div>
          </Paper>
        </li>
      ))}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default CitiesList;
