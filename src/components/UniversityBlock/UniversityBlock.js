import React from 'react';
import Paper from '../common/Paper/Paper';
import Card from './Card/Card';
import s from './UniversityBlock.module.css';

const UniversityBlock = ({ name, description }) => {
  return (
    <section className={s.section}>
      <Paper>
        <Card name={name} />
      </Paper>
      <Paper>
        <p className={s.text}>{description}</p>
      </Paper>
    </section>
  );
};

export default UniversityBlock;
