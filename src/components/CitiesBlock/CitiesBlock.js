import React from 'react';
import PropTypes from 'prop-types';
import CitiesList from './CitiesList/CitiesList';
import addIcon from '../../images/plus.svg';
import BigButton from '../common/BigButton/BigButton';

const CitiesBlock = ({ cities }) => {
  return (
    <div style={{ marginBottom: 32 }}>
      <CitiesList cities={cities} />
      <BigButton icon={addIcon} text="Add City" />
    </div>
  );
};

CitiesBlock.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default CitiesBlock;
