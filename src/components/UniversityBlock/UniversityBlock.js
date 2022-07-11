import React from 'react';
import Paper from '../common/Paper/Paper';
import Card from './Card/Card';

const UniversityBlock = ({ name, description, tutors }) => {
  return (
    <div>
      <Paper>
        <Card name={name} />
      </Paper>
      <Paper>
        <p>{description}</p>
      </Paper>
    </div>
  );
};

export default UniversityBlock;
