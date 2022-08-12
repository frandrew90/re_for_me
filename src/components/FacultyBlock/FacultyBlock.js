import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'react-use';
// import PropTypes from 'prop-types';
import BigButton from '../common/BigButton/BigButton';
import Modal from '../common/Modal/Modal';
import EditCard from '../common/EditCard/EditCard';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import AddForm from '../common/AddForm/AddForm';
import Filter from '../common/Filter/Filter';
// import FacultyList from './FacultyList/FacultyList';
import ItemsList from '../common/ItemsList/ItemsList';
import Loader from '../common/Loader/Loader';
import Skeleton from '../common/Skeleton/Skeleton';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import * as api from '../../services/api';
import cancelIcon from '../../images/cancel-circle.svg';
import pencilIcon from '../../images/pencil.svg';
import addIcon from '../../images/plus.svg';
import deleteIcon from '../../images/bin.svg';

const API_ENDPOINT = 'departments';

const FILTER_KEY = 'facultyFilter';

const ACTION = {
  NONE: 'none',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
};

const facultyReducer = (state = [], action) => {
  switch (action.type) {
    case 'get':
      return action.payload;

    case 'add':
      return [...state, action.payload];

    case 'edit':
      return state.map(department =>
        department.id === action.payload.id ? action.payload : department,
      );

    case 'delete':
      return state.filter(department => department.id !== action.payload);

    default:
      console.log('Type is not wright');
      break;
  }
};

const FacultyBlock = () => {
  // const [departments, setDepartments] = useState([]);
  const [departments, dispatch] = useReducer(facultyReducer, []);
  // const [filter, setFilter] = useState('');
  const [filter, setFilter] = useLocalStorage(FILTER_KEY, '');
  //form/modal
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [openedModal, setOpenedModal] = useState(ACTION.NONE);
  //actions
  const [action, setAction] = useState(ACTION.NONE);
  const [activeDepartment, setActiveDepartment] = useState(null);
  //api request status
  const [firstLoading, setFirstLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //GET DEPARTMENTS

  // useEffect(() => {
  //   const fetchDepartments = async () => {
  //     setFirstLoading(true);
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const departments = await api.getData(API_ENDPOINT);
  //       setDepartments(departments);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //       setFirstLoading(false);
  //     }
  //   };

  //   fetchDepartments();
  // }, []);

  //GET DEPARTMENTS with useReduser

  useEffect(() => {
    const fetchDepartments = async () => {
      setFirstLoading(true);
      setLoading(true);
      setError(null);

      try {
        const departments = await api.getData(API_ENDPOINT);
        dispatch({ type: 'get', payload: departments });
        // setDepartments(departments);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setFirstLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  //ADD DEPARTMENT

  // const toggleAddForm = () => {
  //   setIsAddFormOpen(prevIsAddFormOpen => !prevIsAddFormOpen);
  // };

  // const confirmAdd = departmentName => {
  //   const isDublicate = checkIfDublicate(departmentName);
  //   if (isDublicate) {
  //     toast.warn(`Faculty ${departmentName} is already in list!`);
  //     return;
  //   }
  //   setActiveDepartment({ name: departmentName });
  //   setAction(ACTION.ADD);
  // };

  // const checkIfDublicate = departmentName =>
  //   departments.some(department => department.name === departmentName);

  // useEffect(() => {
  //   if (action !== ACTION.ADD) return;

  //   const addDepartment = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const newDepartment = await api.saveItem(
  //         API_ENDPOINT,
  //         activeDepartment,
  //       );
  //       setDepartments(prevDepartments => [...prevDepartments, newDepartment]);
  //       toggleAddForm();
  //       toast.success(`Faculty ${newDepartment.name} was added`);
  //     } catch (error) {
  //       setError(error.message);
  //       toast.error(`Somthing went wrong! Error: ${error.message}`);
  //     } finally {
  //       setAction(ACTION.NONE);
  //       setLoading(false);
  //       setActiveDepartment(null);
  //     }
  //   };
  //   addDepartment();
  // }, [action, activeDepartment]);

  //ADD DEPARTMENT with useReducer

  const toggleAddForm = () => {
    setIsAddFormOpen(prevIsAddFormOpen => !prevIsAddFormOpen);
  };

  const confirmAdd = departmentName => {
    const isDublicate = checkIfDublicate(departmentName);
    if (isDublicate) {
      toast.warn(`Faculty ${departmentName} is already in list!`);
      return;
    }
    setActiveDepartment({ name: departmentName });
    setAction(ACTION.ADD);
  };

  const checkIfDublicate = departmentName =>
    departments.some(department => department.name === departmentName);

  useEffect(() => {
    if (action !== ACTION.ADD) return;

    const addDepartment = async () => {
      setLoading(true);
      setError(null);

      try {
        const newDepartment = await api.saveItem(
          API_ENDPOINT,
          activeDepartment,
        );
        dispatch({ type: 'add', payload: newDepartment });
        // setDepartments(prevDepartments => [...prevDepartments, newDepartment]);
        toggleAddForm();
        toast.success(`Faculty ${newDepartment.name} was added`);
      } catch (error) {
        setError(error.message);
        toast.error(`Somthing went wrong! Error: ${error.message}`);
      } finally {
        setAction(ACTION.NONE);
        setLoading(false);
        setActiveDepartment(null);
      }
    };
    addDepartment();
  }, [action, activeDepartment]);

  //EDIT DEPARTMENT

  // const handleStartEditting = useCallback(activeDepartment => {
  //   setActiveDepartment(activeDepartment);
  //   setOpenedModal(ACTION.EDIT);
  // }, []);

  // const confirmEdit = editDepartmentName => {
  //   if (editDepartmentName === activeDepartment.name) {
  //     closeModal();
  //     return;
  //   }
  //   setAction(ACTION.EDIT);
  //   setActiveDepartment({ ...activeDepartment, name: editDepartmentName });
  // };

  // useEffect(() => {
  //   if (action !== ACTION.EDIT) return;

  //   const editDepartment = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const updatedDepartment = await api.editItem(
  //         API_ENDPOINT,
  //         activeDepartment,
  //       );
  //       setDepartments(prevDepartments =>
  //         prevDepartments.map(department =>
  //           department.id === updatedDepartment.id
  //             ? updatedDepartment
  //             : department,
  //         ),
  //       );
  //     } catch (error) {
  //       setError(error.message);
  //       toast.error(`Somthing went wrong! Error: ${error.message}`);
  //     } finally {
  //       setAction(ACTION.NONE);
  //       closeModal();
  //       setLoading(false);
  //       setActiveDepartment(null);
  //     }
  //   };
  //   editDepartment();
  // }, [action, activeDepartment]);

  //EDIT DEPARTMENT with useReducer

  const handleStartEditting = useCallback(activeDepartment => {
    setActiveDepartment(activeDepartment);
    setOpenedModal(ACTION.EDIT);
  }, []);

  const confirmEdit = editDepartmentName => {
    if (editDepartmentName === activeDepartment.name) {
      closeModal();
      return;
    }
    setAction(ACTION.EDIT);
    setActiveDepartment({ ...activeDepartment, name: editDepartmentName });
  };

  useEffect(() => {
    if (action !== ACTION.EDIT) return;

    const editDepartment = async () => {
      setLoading(true);
      setError(null);

      try {
        const updatedDepartment = await api.editItem(
          API_ENDPOINT,
          activeDepartment,
        );
        dispatch({ type: 'edit', payload: updatedDepartment });
      } catch (error) {
        setError(error.message);
        toast.error(`Somthing went wrong! Error: ${error.message}`);
      } finally {
        setAction(ACTION.NONE);
        closeModal();
        setLoading(false);
        setActiveDepartment(null);
      }
    };
    editDepartment();
  }, [action, activeDepartment]);

  //DELETE DEPARTMENT

  // const handleStartDeleting = useCallback(activeDepartment => {
  //   setActiveDepartment(activeDepartment);
  //   setOpenedModal(ACTION.DELETE);
  // }, []);

  // const confirmDelete = () => setAction(ACTION.DELETE);

  // useEffect(() => {
  //   if (action !== ACTION.DELETE) return;

  //   const deleteDepartment = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const deletedDepartment = await api.deleteItem(
  //         API_ENDPOINT,
  //         activeDepartment.id,
  //       );
  //       setDepartments(prevDepartments =>
  //         prevDepartments.filter(
  //           department => department.id !== deletedDepartment.id,
  //         ),
  //       );
  //     } catch (error) {
  //       setError(error.message);
  //       toast.error(`Somthing went wrong! Error: ${error.message}`);
  //     } finally {
  //       setAction(ACTION.NONE);
  //       closeModal();
  //       setLoading(false);
  //       setActiveDepartment(null);
  //     }
  //   };
  //   deleteDepartment();
  // }, [action, activeDepartment]);

  //DELETE DEPARTMENT with useReducer

  const handleStartDeleting = useCallback(activeDepartment => {
    setActiveDepartment(activeDepartment);
    setOpenedModal(ACTION.DELETE);
  }, []);

  const confirmDelete = () => setAction(ACTION.DELETE);

  useEffect(() => {
    if (action !== ACTION.DELETE) return;

    const deleteDepartment = async () => {
      setLoading(true);
      setError(null);
      try {
        const deletedDepartment = await api.deleteItem(
          API_ENDPOINT,
          activeDepartment.id,
        );
        dispatch({ type: 'delete', payload: deletedDepartment.id });
      } catch (error) {
        setError(error.message);
        toast.error(`Somthing went wrong! Error: ${error.message}`);
      } finally {
        setAction(ACTION.NONE);
        closeModal();
        setLoading(false);
        setActiveDepartment(null);
      }
    };
    deleteDepartment();
  }, [action, activeDepartment]);
  //========

  //CLOSE MODAL
  const closeModal = () => {
    setActiveDepartment(null);
    setOpenedModal(ACTION.NONE);
  };

  //FILTER DEPARTMENT

  const handleFilterChange = value => setFilter(value);
  const getFilteredDepartments = () => {
    const normolizedFilter = filter.toLowerCase();
    return departments.filter(department =>
      department.name.toLowerCase().includes(normolizedFilter),
    );
  };
  // =========================================

  const filteredDepartments = getFilteredDepartments();

  const noDepartments = !firstLoading && !loading && !departments.length;

  return (
    <div>
      {loading && <Loader />}

      {firstLoading && <Skeleton />}

      {departments.length > 1 && (
        <Filter
          label="Find faculty:"
          value={filter}
          onFilterChange={handleFilterChange}
        />
      )}

      <div>
        {!!filteredDepartments.length && (
          <ItemsList
            items={filteredDepartments}
            onEditItem={handleStartEditting}
            onDeleteItem={handleStartDeleting}
            link="faculties"
          />
        )}

        {noDepartments && <h4> No faculties yet!</h4>}

        {isAddFormOpen && (
          <AddForm
            onSubmit={confirmAdd}
            formName="Adding faculty"
            placeholder="Faculty"
          />
        )}

        {error && <ErrorMsg message={error} />}

        <BigButton
          text={isAddFormOpen ? 'Cancel adding Faculty' : 'Add Faculty'}
          icon={isAddFormOpen ? cancelIcon : addIcon}
          onClickBtn={toggleAddForm}
          disabled={loading}
        />
      </div>

      {openedModal === ACTION.EDIT && (
        <Modal
          title="Editing the Faculty"
          onClose={closeModal}
          icon={pencilIcon}
        >
          <EditCard
            label="Faculty"
            inputValue={activeDepartment.name}
            onSave={confirmEdit}
          />
        </Modal>
      )}

      {openedModal === ACTION.DELETE && (
        <Modal
          title="Deleting the Faculty"
          onClose={closeModal}
          icon={deleteIcon}
        >
          <DeleteCard
            text="Are you sure? The faculty will be deleted!"
            onDelete={confirmDelete}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default FacultyBlock;

// FacultyBlock.propTypes = {
//   department: PropTypes.array.isRequired,
// };
