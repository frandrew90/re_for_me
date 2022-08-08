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
      {cities.map(city => (
        <li key={city.id}>
          <Paper>
            <CardWithMenu
              text={city.name}
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
