import React from 'react';
import Header from '../Header/Header';
import UniversityBlock from '../UniversityBlock/UniversityBlock';
import universityInfo from '../../data/universityInfo.json';
import TutorsBlock from '../TutorsBlock/TutorsBlock';

const { name, description, tutors } = universityInfo;

const Main = () => {
  return (
    <main>
      Main
      <Header title="Info about the University" />
      <UniversityBlock name={name} description={description} tutors={tutors} />
      <TutorsBlock tutors={tutors} />
    </main>
  );
};

export default Main;
