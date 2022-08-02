import React from 'react';
import Header from '../Header/Header';
import UniversityBlock from '../UniversityBlock/UniversityBlock';
import universityInfo from '../../data/universityInfo.json';
import TutorsBlock from '../TutorsBlock/TutorsBlock';
import CitiesBlock from '../CitiesBlock/CitiesBlock';
import Section from '../common/Section/Section';
import s from './Main.module.css';
import tutorsIcon from '../../images/user-tie.svg';
import citiesIcon from '../../images/earth.svg';
import facultyIcon from '../../images/book.svg';
import FacultyBlock from '../FacultyBlock/FacultyBlock';

const {
  name,
  description,
  // tutors,
  cities,
  department,
} = universityInfo;

const Main = () => {
  return (
    <main className={s.main}>
      <Header title="Info about the University" />
      <UniversityBlock name={name} description={description} />

      <Section icon={tutorsIcon} title="Tutors">
        {/* <TutorsBlock tutors={tutors} /> */}
        <TutorsBlock />
      </Section>

      <Section icon={citiesIcon} title="Cities">
        <CitiesBlock cities={cities} />
      </Section>

      <Section icon={facultyIcon} title="Faculties">
        <FacultyBlock departments={department} />
      </Section>
    </main>
  );
};

export default Main;
