import React from 'react';
import PropTypes from 'prop-types';
import BigButton from '../common/BigButton/BigButton';
import addIcon from '../../images/plus.svg';
import FacultyList from './FacultyList/FacultyList';

const FacultyBlock = ({ department = [] }) => {
  return (
    <div>
      <FacultyList department={department} />
      <BigButton icon={addIcon} text="Add Faculty" />
    </div>
  );
};

export default FacultyBlock;

FacultyBlock.propTypes = {
  department: PropTypes.array.isRequired,
};
