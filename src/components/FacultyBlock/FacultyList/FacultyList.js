/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../common/Paper/Paper';
import dots from '../../../images/make-group.svg';
import { ListStyles, itemStyles } from '../../../styles/listStyles';

const FacultyList = ({ department = [] }) => {
  return (
    <ul css={ListStyles}>
      {department.map(depart => (
        <li key={depart.name}>
          <Paper>
            <div css={itemStyles}>
              <p>{depart.name}</p>
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

FacultyList.propTypes = {
  department: PropTypes.array.isRequired,
};

export default FacultyList;
