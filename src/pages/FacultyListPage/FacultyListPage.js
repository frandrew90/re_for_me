import React, { useState, useEffect } from 'react';

import Paper from '../../components/common/Paper/Paper';
import Header from '../../components/Header/Header';

import * as api from '../../services/api';
import s from './FacultyListPage.module.css';

const API_ENDPOINT = 'departments';

const FacultyListPage = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = () => {
      api
        .getData(API_ENDPOINT)
        .then(setDepartments)
        .catch(err => console.log(err));
    };
    fetchDepartments();
  }, []);

  return (
    <>
      <Header title="Faculties" />

      {!!departments.length && (
        <ul>
          {departments.map(({ id, name }) => (
            <li key={id} className={s.listElem}>
              <a href="/">
                <Paper>
                  <p className={s.text}>Faculty of {name}</p>
                </Paper>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FacultyListPage;
