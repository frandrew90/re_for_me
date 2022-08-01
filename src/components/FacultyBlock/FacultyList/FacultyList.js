/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../common/Paper/Paper';
import CardWithMenu from '../../common/CardWithMenu/CardWithMenu';
import { ListStyles } from '../../../styles/listStyles';
// import dots from '../../../images/make-group.svg';

const FacultyList = ({ department, onEditDepartment, onDeleteDepartment }) => {
  return (
    <ul css={ListStyles}>
      {department.map(depart => (
        <li key={depart.name}>
          <Paper>
            <CardWithMenu
              text={depart.name}
              onEdit={() => onEditDepartment(depart.name)}
              onDelete={() => onDeleteDepartment(depart.name)}
            />
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
