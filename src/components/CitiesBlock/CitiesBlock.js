import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {
  citiesActions,
  citiesOperations,
  citiesSelectors,
} from '../../redux/cities';
import BigButton from '../common/BigButton/BigButton';
import Modal from '../common/Modal/Modal';
import EditCard from '../common/EditCard/EditCard';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import AddForm from '../common/AddForm/AddForm';
import Filter from '../common/Filter/Filter';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import Loader from '../common/Loader/Loader';
import Skeleton from '../common/Skeleton/Skeleton';
import ItemsList from '../common/ItemsList/ItemsList';
import cancelIcon from '../../images/cancel-circle.svg';
import pencilIcon from '../../images/pencil.svg';
import addIcon from '../../images/plus.svg';
import deleteIcon from '../../images/bin.svg';

const ACTION = {
  NONE: 'none',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
};

const { getCities, addCity, editCity, deleteCity } = citiesOperations;

const CitiesBlock = () => {
  const cities = useSelector(citiesSelectors.getCities);
  const filter = useSelector(citiesSelectors.getFilter);
  const loading = useSelector(citiesSelectors.getLoading);
  const error = useSelector(citiesSelectors.getError);
  const dispatch = useDispatch();
  //form/modal
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [openedModal, setOpenedModal] = useState(ACTION.NONE);
  //actions
  const [action, setAction] = useState(ACTION.NONE);
  const [activeCity, setActiveCity] = useState(null);
  //api request status
  // const [firstLoading, setFirstLoading] = useState(false);

  //GET CITIES

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

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
    if (action !== ACTION.ADD || !activeCity) return;
    dispatch(addCity(activeCity)).then(() => {
      toggleAddForm();
      toast.success(`City ${activeCity.name} was added`);
      setAction(ACTION.NONE);
      setActiveCity(null);
    });
  }, [action, activeCity, dispatch]);

  //EDIT CITY

  const handleStartEditting = useCallback(activeCity => {
    setActiveCity(activeCity);
    setOpenedModal(ACTION.EDIT);
  }, []);

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

    dispatch(editCity(activeCity)).then(() => {
      setAction(ACTION.NONE);
      closeModal();
      setActiveCity(null);
    });
  }, [action, activeCity, dispatch]);

  //DELETE CITY

  const handleStartDeleting = useCallback(activeCity => {
    setActiveCity(activeCity);
    setOpenedModal(ACTION.DELETE);
  }, []);

  const confirmDelete = () => setAction(ACTION.DELETE);

  useEffect(() => {
    if (action !== ACTION.DELETE) return;

    dispatch(deleteCity(activeCity.id)).then(() => {
      setAction(ACTION.NONE);
      closeModal();
      setActiveCity(null);
    });
  }, [action, activeCity, dispatch]);

  //CLOSE MODAL
  const closeModal = () => {
    setActiveCity(null);
    setOpenedModal(ACTION.NONE);
  };

  //FILTER CITY

  // useEffect(() => {
  //   storage.save(FILTER_KEY, filter);
  // }, [filter]);

  // const handleFilterChange = value => setFilter(value);

  const filteredCities = useMemo(() => {
    const normolizedFilter = filter.toLowerCase();
    return cities.filter(city =>
      city.name.toLowerCase().includes(normolizedFilter),
    );
  }, [cities, filter]);

  // const getFilteredCities = () => {
  //   const normolizedFilter = filter.toLowerCase();
  //   return cities.filter(city =>
  //     city.name.toLowerCase().includes(normolizedFilter),
  //   );
  // };

  //RENDER

  // const filteredCities = getFilteredCities();

  const noCities = !loading && !cities.length;

  //FIX FILTER BUG
  useEffect(() => {
    if (cities.length === 1) {
      dispatch(citiesActions.changeFilter(''));
    }
  }, [cities.length, dispatch]);

  return (
    <>
      {loading && <Loader />}

      {loading && <Skeleton />}

      {cities.length > 1 && (
        <Filter
          label="Find city:"
          // value={filter}
          // onFilterChange={handleFilterChange}
        />
      )}

      <div style={{ marginBottom: 32 }}>
        {!!filteredCities.length && (
          <ItemsList
            items={filteredCities}
            onEditItem={handleStartEditting}
            onDeleteItem={handleStartDeleting}
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
