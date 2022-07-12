/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import dots from '../../../images/make-group.svg';
import Paper from '../../common/Paper/Paper';
import { ListStyles, itemStyles } from '../../../styles/listStyles';

const CitiesList = ({ cities }) => {
  return (
    <ul css={ListStyles}>
      {cities.map((city, idx) => (
        <li key={idx}>
          <Paper>
            <div css={itemStyles}>
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
