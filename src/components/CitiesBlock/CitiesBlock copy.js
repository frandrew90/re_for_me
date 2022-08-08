import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../common/BigButton/BigButton';
import Modal from '../common/Modal/Modal';
import EditCard from '../common/EditCard/EditCard';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import AddForm from '../common/AddForm/AddForm';
import Filter from '../common/Filter/Filter';
import CitiesList from './CitiesList/CitiesList';
import * as storage from '../../services/localStorage';
import cancelIcon from '../../images/cancel-circle.svg';
import pencilIcon from '../../images/pencil.svg';
import addIcon from '../../images/plus.svg';
import deleteIcon from '../../images/bin.svg';

// const CitiesBlock = ({ cities }) => {
//   return (
//     <div style={{ marginBottom: 32 }}>
//       <CitiesList cities={cities} />
//       <BigButton icon={addIcon} text="Add City" />
//     </div>
//   );
// };

// CitiesBlock.propTypes = {
//   cities: PropTypes.array.isRequired,
// };

const STORAGE_KEY = 'cities';

const MODAL = {
  NONE: 'none',
  EDIT: 'edit',
  DELETE: 'delete',
};

class CitiesBlock extends Component {
  state = {
    cities: this.props.cities,
    isAddFormOpen: false,
    openedModal: MODAL.NONE,
    // isDeleteModalOpen: false,
    // isEditModalOpen: false,
    activeCity: '',
    filter: '',
  };

  componentDidMount() {
    const savedCities = storage.get(STORAGE_KEY);
    if (savedCities) {
      this.setState({ cities: savedCities });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { cities } = this.state;

    if (prevState.cities !== cities) {
      console.log('cities were changed');
      storage.save(STORAGE_KEY, cities);
    }
  }

  //ADD CITY

  toggleAddForm = () => {
    this.setState(prevState => ({ isAddFormOpen: !prevState.isAddFormOpen }));
  };

  addCity = city => {
    const isDublicate = this.checkIfDublicate(city);
    if (isDublicate) {
      alert(`City ${city} is already in list!`);
      return;
    }
    // const newCity = { name: city };
    const newCity = city;
    this.setState(prevState => ({
      cities: [...prevState.cities, newCity],
      isAddFormOpen: false,
    }));
  };

  checkIfDublicate = checkedCity =>
    this.state.cities.some(city => city === checkedCity);

  //EDIT CITY

  handleStartEditting = activeCity => {
    this.setState({
      // isEditModalOpen: true,
      openedModal: MODAL.EDIT,
      activeCity,
    });
  };
  saveEditCity = editCity => {
    this.setState(prevState => ({
      cities: prevState.cities.map(city => {
        if (city === prevState.activeCity) {
          return (city = editCity);
        }
        return city;
      }),
      // activeCity: '',
    }));
    // this.closeEditModal()
    this.closeModal();
  };
  // closeEditModal = () => this.setState({ isEditModalOpen: false });

  //DELETE CITY

  handleStartDeleting = activeCity => {
    this.setState({
      // isDeleteModalOpen: true,
      openedModal: MODAL.DELETE,
      activeCity,
    });
  };
  deleteCity = () => {
    this.setState(prevState => ({
      cities: prevState.cities.filter(city => city !== prevState.activeCity),
      // activeCity: '',
    }));
    // this.closeDeleteModal();
    this.closeModal();
  };
  // closeDeleteModal = () => this.setState({ isDeleteModalOpen: false });

  //CLOSE MODAL
  closeModal = () => this.setState({ openedModal: MODAL.NONE, activeCity: '' });

  //FILTER CITY

  handleFilterChange = value => this.setState({ filter: value });
  getFilteredCities = () => {
    const { cities, filter } = this.state;
    const normolizedFilter = filter.toLowerCase();
    return cities.filter(city => city.toLowerCase().includes(normolizedFilter));
  };

  render() {
    const {
      cities,
      isAddFormOpen,
      // isDeleteModalOpen,
      // isEditModalOpen,
      activeCity,
      filter,
      openedModal,
    } = this.state;

    const filteredCities = this.getFilteredCities();

    return (
      <>
        {cities.length > 1 && (
          <Filter
            label="Find city:"
            value={filter}
            onFilterChange={this.handleFilterChange}
          />
        )}

        <div style={{ marginBottom: 32 }}>
          {!!filteredCities.length && (
            <CitiesList
              // cities={cities}
              cities={filteredCities}
              onEditCity={this.handleStartEditting}
              onDeleteCity={this.handleStartDeleting}
            />
          )}

          {!cities.length && (
            <p style={{ marginBottom: 32 }}>There is no one city yet!</p>
          )}

          {isAddFormOpen && (
            <AddForm
              onSubmit={this.addCity}
              formName="Adding city"
              placeholder="City"
            />
          )}

          <BigButton
            text={isAddFormOpen ? 'Cancel adding City' : 'Add City'}
            icon={isAddFormOpen ? cancelIcon : addIcon}
            onClickBtn={this.toggleAddForm}
          />
        </div>

        {openedModal === MODAL.EDIT && (
          <Modal
            title="Editing the City"
            onClose={this.closeModal}
            icon={pencilIcon}
          >
            <EditCard
              label="City"
              inputValue={activeCity}
              onSave={this.saveEditCity}
            />
          </Modal>
        )}

        {openedModal === MODAL.DELETE && (
          <Modal
            title="Deleting the City"
            onClose={this.closeModal}
            icon={deleteIcon}
          >
            <DeleteCard
              text="Are you sure? The city will be deleted!"
              onDelete={this.deleteCity}
              onClose={this.closeModal}
            />
          </Modal>
        )}
      </>
    );
  }
}

CitiesBlock.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default CitiesBlock;
