import React, { useState, useEffect } from 'react';
import {
  useParams,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import Paper from '../../components/common/Paper/Paper';
import BigButton from '../../components/common/BigButton/BigButton';
import Header from '../../components/Header/Header';
import * as api from '../../services/api';
import s from './FacultyPage.module.css';

const API_ENDPOINT = 'departments';

const FacultyPage = () => {
  const [department, setDepartment] = useState({});

  const location = useLocation();
  //   console.log(location);

  const history = useHistory();
  //   console.log(history);

  const match = useRouteMatch();
  //   console.log(match);

  const { id } = useParams();
  //   console.log(id);

  useEffect(() => {
    const fetchDepartment = () => {
      api
        .getData(`${API_ENDPOINT}/${id}`) //добавить id
        .then(setDepartment)
        .catch(err => toast.error('Faculty is not found'));
    };
    fetchDepartment();
  }, [id]);

  const handleGoBack = () => {
    // history.goBack();
    history.push(location.state.from);
  };

  return (
    <>
      <Header title={department.name ?? 'Faculty'} />

      <div className={s.wrapper}>
        <BigButton text="Go Back" onClickBtn={handleGoBack} isGray />
      </div>

      <nav className={s.nav}>
        <div className={s.linkWrapper}>
          <NavLink
            // to={`${match.url}/description`}
            to={{
              pathname: `${match.url}/description`,
              state: {
                from: location.state.from,
              },
            }}
            className={s.link}
            activeClassName={s.activeLink}
          >
            Description
          </NavLink>
        </div>

        <div className={s.linkWrapper}>
          <NavLink
            // to={`${match.url}/history`}
            to={{
              pathname: `${match.url}/history`,
              state: {
                from: location.state.from,
              },
            }}
            className={s.link}
            activeClassName={s.activeLink}
          >
            History
          </NavLink>
        </div>
      </nav>

      <Switch>
        <Route path={`${match.path}/description`}>
          <Paper>
            <p className={s.text}>
              Description Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam reprehenderit pariatur ipsam sed qui consectetur
              labore enim suscipit hic explicabo vero ut tenetur ipsa, odit
              minima, at saepe error voluptatibus quam rem ab vel facilis
              placeat! Laudantium amet sed enim quisquam saepe assumenda fugiat
              quae maxime? Atque id assumenda minima.
            </p>
          </Paper>
        </Route>
        <Route path={`${match.path}/history`}>
          <Paper>
            <p className={s.text}>
              History Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Minima minus consequatur in dolores et deserunt vel. Reiciendis
              voluptatibus dignissimos quasi eveniet expedita ipsam aliquam
              atque. Aperiam commodi cupiditate id deleniti!
            </p>
          </Paper>
        </Route>
      </Switch>
    </>
  );
};

export default FacultyPage;
