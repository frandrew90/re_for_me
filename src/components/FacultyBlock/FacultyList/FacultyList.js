/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../common/Paper/Paper';
import CardWithMenu from '../../common/CardWithMenu/CardWithMenu';
import { ListStyles } from '../../../styles/listStyles';
// import dots from '../../../images/make-group.svg';

const FacultyList = ({ departments, onEditDepartment, onDeleteDepartment }) => {
  return (
    <ul css={ListStyles}>
      {departments.map(depart => (
        <li key={depart.id}>
          <Paper>
            <CardWithMenu
              text={`Faculty of ${depart.name}`}
              onEdit={() => onEditDepartment(depart)}
              onDelete={() => onDeleteDepartment(depart)}
            />
          </Paper>
        </li>
      ))}
    </ul>
  );
};

FacultyList.propTypes = {
  departments: PropTypes.array.isRequired,
};

export default FacultyList;
