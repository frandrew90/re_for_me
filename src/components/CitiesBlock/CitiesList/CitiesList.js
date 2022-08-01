/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
// import dots from '../../../images/make-group.svg';
import Paper from '../../common/Paper/Paper';
import CardWithMenu from '../../common/CardWithMenu/CardWithMenu';
// import { ListStyles, itemStyles } from '../../../styles/listStyles';
import { ListStyles } from '../../../styles/listStyles';

const CitiesList = ({ cities, onEditCity, onDeleteCity }) => {
  return (
    <ul css={ListStyles}>
      {cities.map((city, idx) => (
        <li key={idx}>
          <Paper>
            {/* <div css={itemStyles}>
              <p>{city}</p>
              <button>
                <img src={dots} alt="Menu" />
              </button>
            </div> */}

            <CardWithMenu
              text={city}
              onEdit={() => onEditCity(city)}
              onDelete={() => onDeleteCity(city)}
            />
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
