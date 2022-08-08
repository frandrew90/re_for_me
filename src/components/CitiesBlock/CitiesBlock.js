import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import BigButton from '../common/BigButton/BigButton';
import Modal from '../common/Modal/Modal';
import EditCard from '../common/EditCard/EditCard';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import AddForm from '../common/AddForm/AddForm';
import Filter from '../common/Filter/Filter';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import Loader from '../common/Loader/Loader';
import Skeleton from '../common/Skeleton/Skeleton';
import CitiesList from './CitiesList/CitiesList';
import * as storage from '../../services/localStorage';
import * as api from '../../services/api';
import cancelIcon from '../../images/cancel-circle.svg';
import pencilIcon from '../../images/pencil.svg';
import addIcon from '../../images/plus.svg';
import deleteIcon from '../../images/bin.svg';

const API_ENDPOINT = 'cities';

const ACTION = {
  NONE: 'none',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
};

const CitiesBlock = () => {
  const [cities, setCities] = useState([]);
  const [filter, setFilter] = useState('');
  //form/modal
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [openedModal, setOpenedModal] = useState(ACTION.NONE);
  //actions
  const [action, setAction] = useState(ACTION.NONE);
  const [activeCity, setActiveCity] = useState(null);
  //api request status
  const [firstLoading, setFirstLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //GET CITIES

  useEffect(() => {
    const fetchCities = async () => {
      setFirstLoading(true);
      setLoading(true);
      setError(null);

      try {
        const cities = await api.getData(API_ENDPOINT);
        setCities(cities);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setFirstLoading(false);
      }
    };

    fetchCities();
  }, []);

  console.log(cities);

  //ADD CITY

  const toggleAddForm = () => {
    setIsAddFormOpen(prevIsAddFormOpen => !prevIsAddFormOpen);
  };

  const confirmAdd = cityName => {
    const isDublicate = checkIfDublicate(cityName);
    if (isDublicate) {
      toast.warn(`City ${cityName} is already in list!`);
      return;
    }
    setActiveCity({ name: cityName });
    setAction(ACTION.ADD);
  };

  const checkIfDublicate = cityName =>
    cities.some(city => city.name === cityName);

  useEffect(() => {
    if (action !== ACTION.ADD) return;

    const addCity = async () => {
      setLoading(true);
      setError(null);

      try {
        const newCity = await api.saveItem(API_ENDPOINT, activeCity);
        setCities(prevCities => [...prevCities, newCity]);
        toggleAddForm();
        toast.success(`City ${newCity.name} was added`);
      } catch (error) {
        setError(error.message);
        toast.error(`Somthing went wrong! Error: ${error.message}`);
      } finally {
        setAction(ACTION.NONE);
        setLoading(false);
        setActiveCity(null);
      }
    };
    addCity();
  }, [action, activeCity]);

  //EDIT CITY

  const handleStartEditting = activeCity => {
    setActiveCity(activeCity);
    setOpenedModal(ACTION.EDIT);
  };

  const confirmEdit = editedCityName => {
    if (editedCityName === activeCity.name) {
      closeModal();
      return;
    }
    setAction(ACTION.EDIT);
    setActiveCity({ ...activeCity, name: editedCityName });
  };

  useEffect(() => {
    if (action !== ACTION.EDIT) return;

    const editCity = async () => {
      setLoading(true);
      setError(null);

      try {
        const updatedCity = await api.editItem(API_ENDPOINT, activeCity);
        setCities(prevCities =>
          prevCities.map(city =>
            city.id === updatedCity.id ? updatedCity : city,
          ),
        );
      } catch (error) {
        setError(error.message);
        toast.error(`Somthing went wrong! Error: ${error.message}`);
      } finally {
        setAction(ACTION.NONE);
        closeModal();
        setLoading(false);
        setActiveCity(null);
      }
    };
    editCity();
  }, [action, activeCity]);

  //DELETE CITY

  const handleStartDeleting = activeCity => {
    setActiveCity(activeCity);
    setOpenedModal(ACTION.DELETE);
  };

  const confirmDelete = () => setAction(ACTION.DELETE);

  useEffect(() => {
    if (action !== ACTION.DELETE) return;

    const deleteCity = async () => {
      setLoading(true);
      setError(null);
      try {
        const deletedCity = await api.deleteItem(API_ENDPOINT, activeCity.id);
        setCities(prevCities =>
          prevCities.filter(city => city.id !== deletedCity.id),
        );
      } catch (error) {
        setError(error.message);
        toast.error(`Somthing went wrong! Error: ${error.message}`);
      } finally {
        setAction(ACTION.NONE);
        closeModal();
        setLoading(false);
        setActiveCity(null);
      }
    };
    deleteCity();
  }, [action, activeCity]);

  //CLOSE MODAL
  const closeModal = () => {
    setActiveCity(null);
    setOpenedModal(ACTION.NONE);
  };

  //FILTER CITY

  const handleFilterChange = value => setFilter(value);

  const getFilteredCities = () => {
    const normolizedFilter = filter.toLowerCase();
    return cities.filter(city =>
      city.name.toLowerCase().includes(normolizedFilter),
    );
  };

  //RENDER

  const filteredCities = getFilteredCities();

  const noCities = !firstLoading && !cities.length;

  return (
    <>
      {loading && <Loader />}

      {firstLoading && <Skeleton />}

      {cities.length > 1 && (
        <Filter
          label="Find city:"
          value={filter}
          onFilterChange={handleFilterChange}
        />
      )}

      <div style={{ marginBottom: 32 }}>
        {!!filteredCities.length && (
          <CitiesList
            cities={filteredCities}
            onEditCity={handleStartEditting}
            onDeleteCity={handleStartDeleting}
          />
        )}

        {noCities && (
          <p style={{ marginBottom: 32 }}>There is no one city yet!</p>
        )}

        {isAddFormOpen && (
          <AddForm
            onSubmit={confirmAdd}
            formName="Adding city"
            placeholder="City"
          />
        )}

        {error && <ErrorMsg message={error} />}

        <BigButton
          text={isAddFormOpen ? 'Cancel adding City' : 'Add City'}
          icon={isAddFormOpen ? cancelIcon : addIcon}
          onClickBtn={toggleAddForm}
          disabled={loading}
        />
      </div>

      {openedModal === ACTION.EDIT && (
        <Modal title="Editing the City" onClose={closeModal} icon={pencilIcon}>
          <EditCard
            label="City"
            inputValue={activeCity.name}
            onSave={confirmEdit}
          />
        </Modal>
      )}

      {openedModal === ACTION.DELETE && (
        <Modal title="Deleting the City" onClose={closeModal} icon={deleteIcon}>
          <DeleteCard
            text="Are you sure? The city will be deleted!"
            onDelete={confirmDelete}
            onClose={closeModal}
          />
        </Modal>
      )}
    </>
  );
};

export default CitiesBlock;
