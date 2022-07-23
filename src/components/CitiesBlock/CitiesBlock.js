import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CitiesList from './CitiesList/CitiesList';
import addIcon from '../../images/plus.svg';
import BigButton from '../common/BigButton/BigButton';
import Modal from '../common/Modal/Modal';
import EditCard from '../common/EditCard/EditCard';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import AddForm from '../common/AddForm/AddForm';

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
    activeCity: '',
  };

  //ADD CITY

  toggleAddForm = () => {
    this.setState(prevState => ({ isAddFormOpen: !prevState.isAddFormOpen }));
  };

  addCity = city => {
    const newCity = { name: city };
    this.setState(prevState => ({
      cities: [...prevState.cities, newCity],
      isAddFormOpen: false,
    }));
  };

  //EDIT CITY

  handleStartEditting = activeCity => {};
  saveEditCity = editCity => {};
  closeEditModal = () => {};

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

  handleFilterChange = value => {};
  getFilteredCities = () => {};

  render() {
    const { cities, isAddFormOpen, isDeleteModalOpen } = this.state;

    console.log(this.state.isDeleteModalOpen);

    return (
      <>
        {/* <Filter label="Find city:" value={filter} onChange={this.handleFilterChange} /> */}

        <div style={{ marginBottom: 32 }}>
          <CitiesList
            cities={cities}
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
            icon={!isAddFormOpen && addIcon}
            onClickBtn={this.toggleAddForm}
          />
        </div>

        {/* {isEditModalOpen && (
          <Modal
            title="Edit information about city"
            onClose={this.closeEditModal}
            icon={addIcon}
          >
            <EditCard
              label="City"
              inputValue={activeCity}
              onSave={this.saveEditCity}
            />
          </Modal>
        )} */}

        {isDeleteModalOpen && (
          <Modal
            title="Deleting city"
            onClose={this.closeDeleteModal}
            icon={addIcon}
          >
            <DeleteCard
              text="City will be deleted"
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
