import React from 'react';
import Header from '../Header/Header';
import UniversityBlock from '../UniversityBlock/UniversityBlock';
import universityInfo from '../../data/universityInfo.json';
import TutorsBlock from '../TutorsBlock/TutorsBlock';
import CitiesBlock from '../CitiesBlock/CitiesBlock';

const { name, description, tutors, cities } = universityInfo;

const Main = () => {
  return (
    <main>
      <Header title="Info about the University" />
      <UniversityBlock name={name} description={description} tutors={tutors} />
      <TutorsBlock tutors={tutors} />
      <CitiesBlock cities={cities} />
    </main>
  );
};

export default Main;
