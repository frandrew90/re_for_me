import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import Paper from '../../components/common/Paper/Paper';
import Header from '../../components/Header/Header';

import * as api from '../../services/api';
import s from './FacultyListPage.module.css';

const API_ENDPOINT = 'departments';

const FacultyListPage = () => {
  const [departments, setDepartments] = useState([]);

  const match = useRouteMatch();
  //   console.log(match);
  const location = useLocation();
  //   console.log(location);

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
              <Link
                to={{
                  pathname: `${match.url}/${id}`,
                  state: {
                    from: location,
                    label: ' Go back to Faculties',
                  },
                }}
              >
                <Paper>
                  <p className={s.text}>Faculty of {name}</p>
                </Paper>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FacultyListPage;
