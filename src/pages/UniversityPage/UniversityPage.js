import React from 'react';
import { useTranslation } from 'react-i18next';
import CitiesBlock from '../../components/CitiesBlock/CitiesBlock';
import Section from '../../components/common/Section/Section';
import FacultyBlock from '../../components/FacultyBlock/FacultyBlock';
import Header from '../../components/Header/Header';
import TutorsBlock from '../../components/TutorsBlock/TutorsBlock';
import UniversityBlock from '../../components/UniversityBlock/UniversityBlock';

import universityInfo from '../../data/universityInfo.json';
import tutorsIcon from '../../images/user-tie.svg';
import citiesIcon from '../../images/earth.svg';
import facultyIcon from '../../images/book.svg';

const { name, description } = universityInfo;

const UniversityPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t('university.info')} />

      <UniversityBlock name={name} description={description} />

      <Section icon={tutorsIcon} title={t('tutors.tutors')}>
        <TutorsBlock />
      </Section>

      <Section icon={citiesIcon} title={t('cities.cities')}>
        <CitiesBlock />
      </Section>

      <Section icon={facultyIcon} title={t('departments.departments')}>
        <FacultyBlock />
      </Section>
    </>
  );
};

export default UniversityPage;
