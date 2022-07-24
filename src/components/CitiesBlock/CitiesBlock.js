import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CitiesList from './CitiesList/CitiesList';
import addIcon from '../../images/plus.svg';
import BigButton from '../common/BigButton/BigButton';
import Modal from '../common/Modal/Modal';
import EditCard from '../common/EditCard/EditCard';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import AddForm from '../common/AddForm/AddForm';
import pencilIcon from '../../images/pencil.svg';
import deleteIcon from '../../images/bin.svg';
import Filter from '../common/Filter/Filter';
import cancelIcon from '../../images/cancel-circle.svg';

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

class CitiesBlock extends Component {
  state = {
    cities: this.props.cities,
    isAddFormOpen: false,
    isDeleteModalOpen: false,
    isEditModalOpen: false,
    activeCity: '',
    filter: '',
  };

  //ADD CITY

  toggleAddForm = () => {
    this.setState(prevState => ({ isAddFormOpen: !prevState.isAddFormOpen }));
  };

  addCity = city => {
    // const newCity = { name: city };
    const newCity = city;
    this.setState(prevState => ({
      cities: [...prevState.cities, newCity],
      isAddFormOpen: false,
    }));
  };

  //EDIT CITY

  handleStartEditting = activeCity => {
    this.setState({
      isEditModalOpen: true,
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
      activeCity: '',
    }));
    this.closeEditModal();
  };
  closeEditModal = () => this.setState({ isEditModalOpen: false });

  //DELETE CITY

  handleStartDeleting = activeCity => {
    this.setState({
      isDeleteModalOpen: true,
      activeCity,
    });
  };
  deleteCity = () => {
    this.setState(prevState => ({
      cities: prevState.cities.filter(city => city !== prevState.activeCity),
      activeCity: '',
    }));
    this.closeDeleteModal();
  };
  closeDeleteModal = () => this.setState({ isDeleteModalOpen: false });

  //FILTER CITY

  handleFilterChange = value => this.setState({ filter: value });
  getFilteredCities = () => {
    const { cities, filter } = this.state;
    const normolizedFilter = filter.toLowerCase();
    return cities.filter(city => city.toLowerCase().includes(normolizedFilter));
  };

  render() {
    const {
      // cities,
      isAddFormOpen,
      isDeleteModalOpen,
      isEditModalOpen,
      activeCity,
      filter,
    } = this.state;

    const filteredCities = this.getFilteredCities();

    return (
      <>
        <Filter
          label="Find city:"
          value={filter}
          onFilterChange={this.handleFilterChange}
        />

        <div style={{ marginBottom: 32 }}>
          <CitiesList
            // cities={cities}
            cities={filteredCities}
            onEditCity={this.handleStartEditting}
            onDeleteCity={this.handleStartDeleting}
          />

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

        {isEditModalOpen && (
          <Modal
            title="Editing the City"
            onClose={this.closeEditModal}
            icon={pencilIcon}
          >
            <EditCard
              label="City"
              inputValue={activeCity}
              onSave={this.saveEditCity}
            />
          </Modal>
        )}

        {isDeleteModalOpen && (
          <Modal
            title="Deleting the City"
            onClose={this.closeDeleteModal}
            icon={deleteIcon}
          >
            <DeleteCard
              text="Are you sure? The city will be deleted!"
              onDelete={this.deleteCity}
              onClose={this.closeDeleteModal}
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
