import React, { Component } from 'react';
import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';
import BigButton from '../common/BigButton/BigButton';
import Modal from '../common/Modal/Modal';
import EditCard from '../common/EditCard/EditCard';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import AddForm from '../common/AddForm/AddForm';
import Filter from '../common/Filter/Filter';
import FacultyList from './FacultyList/FacultyList';
import Loader from '../common/Loader/Loader';
import Skeleton from '../common/Skeleton/Skeleton';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import * as api from '../../services/api';
import cancelIcon from '../../images/cancel-circle.svg';
import pencilIcon from '../../images/pencil.svg';
import addIcon from '../../images/plus.svg';
import deleteIcon from '../../images/bin.svg';

const API_ENDPOINT = 'departments';

const ACTION = {
  NONE: 'none',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
};

class FacultyBlock extends Component {
  state = {
    departments: [],
    // departments: this.props.departments,
    filter: '',
    isAddFormOpen: false,
    openedModal: ACTION.NONE,
    action: ACTION.NONE,
    activeDepartment: null,
    loading: false,
    error: null,
    firstLoading: false,
  };

  componentDidMount() {
    this.setState({ firstLoading: true });
    this.fetchDepartments().finally(() =>
      this.setState({ firstLoading: false }),
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { action } = this.state;
    if (prevState.action !== action) {
      switch (action) {
        case ACTION.ADD:
          this.addDepartment();
          break;
        case ACTION.EDIT:
          this.editDepartment();
          break;
        case ACTION.DELETE:
          this.deleteDepartment();
          break;
        default:
          return;
      }
    }
  }

  componentWillUnmount() {}

  //GET DEPARTMENTS

  fetchDepartments = async () => {
    this.setState({ loading: true, error: null });
    try {
      const departments = await api.getData(API_ENDPOINT);
      this.setState({ departments });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  //ADD DEPARTMENT
  toggleAddForm = () => {
    this.setState(prevState => ({ isAddFormOpen: !prevState.isAddFormOpen }));
  };

  // addDepartment = department => {
  //   const isDublicate = this.checkIfDublicate(department);
  //   if (isDublicate) {
  //     alert(`Department ${department} is already in list!`);
  //     return;
  //   }
  //   const newDepartment = { name: department };
  //   this.setState(prevState => ({
  //     departments: [...prevState.departments, newDepartment],
  //     isAddFormOpen: false,
  //   }));
  // };

  confirmAdd = departmentName => {
    const isDublicate = this.checkIfDublicate(departmentName);
    if (isDublicate) {
      toast.warn(`Department ${departmentName} is already in list!`);
      return;
    }
    this.setState({
      action: ACTION.ADD,
      activeDepartment: { name: departmentName },
    });
  };

  checkIfDublicate = departmentName =>
    this.state.departments.some(({ name }) => name === departmentName);

  addDepartment = async () => {
    this.setState({ loading: true, error: null });
    const { activeDepartment } = this.state;
    try {
      const newDepartment = await api.saveItem(API_ENDPOINT, activeDepartment);
      this.setState(prevState => ({
        departments: [...prevState.departments, newDepartment],
      }));
      this.toggleAddForm();
      toast.success(`Faculty of ${newDepartment.name} was added`);
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(`Somthing went wrong! Error: ${error.message}`);
    } finally {
      this.setState({
        activeDepartment: null,
        action: ACTION.NONE,
        loading: false,
      });
    }
  };

  //EDIT DEPARTMENT

  handleStartEditting = activeDepartment => {
    this.setState({
      openedModal: ACTION.EDIT,
      activeDepartment,
    });
  };

  confirmEdit = editDepartmentName => {
    const { activeDepartment } = this.state;
    if (editDepartmentName === activeDepartment.name) {
      // this.setState({ openedModal: ACTION.NONE, activeDepartment: null });
      this.closeModal();
      return;
    }
    this.setState({
      action: ACTION.EDIT,
      activeDepartment: {
        ...activeDepartment,
        name: editDepartmentName,
      },
    });
  };

  // editDepartment = editDepartment => {
  //   this.setState(prevState => ({
  //     departments: prevState.departments.map(department => {
  //       if (department.name === prevState.activeDepartment) {
  //         return { ...department, name: editDepartment };
  //       }
  //       return department;
  //     }),
  //   }));
  //   this.closeModal();
  // };

  editDepartment = async () => {
    this.setState({ loading: true, error: null });
    const { activeDepartment } = this.state;
    try {
      const updatedDepartment = await api.editItem(
        API_ENDPOINT,
        activeDepartment,
      );
      this.setState(prevState => ({
        departments: prevState.departments.map(depart =>
          depart.id === updatedDepartment.id ? updatedDepartment : depart,
        ),
      }));
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(`Somthing went wrong! Error: ${error.message}`);
    } finally {
      this.closeModal();
      this.setState({
        // activeDepartment: null,
        action: ACTION.NONE,
        loading: false,
      });
    }
  };

  //DELETE DEPARTMENT

  handleStartDeleting = activeDepartment => {
    this.setState({
      openedModal: ACTION.DELETE,
      activeDepartment,
    });
  };

  confirmDelete = () => this.setState({ action: ACTION.DELETE });

  deleteDepartment = async () => {
    this.setState({ loading: true, error: null });
    const { activeDepartment } = this.state;
    try {
      const deletedDepartment = await api.deleteItem(
        API_ENDPOINT,
        activeDepartment.id,
      );
      this.setState(prevState => ({
        departments: prevState.departments.filter(
          depart => depart.id !== deletedDepartment.id,
        ),
      }));
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(`Somthing went wrong! Error: ${error.message}`);
    } finally {
      this.closeModal();
      this.setState({ loading: false, action: ACTION.NONE });
    }
  };

  // deleteDepartment = () => {
  //   this.setState(prevState => ({
  //     departments: prevState.departments.filter(
  //       department => department.name !== prevState.activeDepartment,
  //     ),
  //   }));
  //   this.closeModal();
  // };

  //CLOSE MODAL
  closeModal = () =>
    this.setState({ openedModal: ACTION.NONE, activeDepartment: null });

  //FILTER DEPARTMENT

  handleFilterChange = value => this.setState({ filter: value });
  getFilteredDepartments = () => {
    const { departments, filter } = this.state;
    const normolizedFilter = filter.toLowerCase();
    return departments.filter(department =>
      department.name.toLowerCase().includes(normolizedFilter),
    );
  };
  // =========================================

  render() {
    const {
      departments,
      isAddFormOpen,
      openedModal,
      activeDepartment,
      loading,
      error,
      filter,
      firstLoading,
    } = this.state;

    const filteredDepartments = this.getFilteredDepartments();

    const noDepartments = !firstLoading && !departments.length;

    return (
      <div>
        {loading && <Loader />}

        {firstLoading && <Skeleton />}

        {departments.length > 1 && (
          <Filter
            label="Find faculty:"
            value={filter}
            onFilterChange={this.handleFilterChange}
          />
        )}

        <div>
          {!!filteredDepartments.length && (
            <FacultyList
              departments={filteredDepartments}
              onEditDepartment={this.handleStartEditting}
              onDeleteDepartment={this.handleStartDeleting}
            />
          )}

          {noDepartments && <h4> No faculties yet!</h4>}

          {isAddFormOpen && (
            <AddForm
              onSubmit={this.confirmAdd}
              formName="Adding faculty"
              placeholder="Faculty"
            />
          )}

          {error && <ErrorMsg message={error} />}

          <BigButton
            text={isAddFormOpen ? 'Cancel adding Faculty' : 'Add Faculty'}
            icon={isAddFormOpen ? cancelIcon : addIcon}
            onClickBtn={this.toggleAddForm}
            disabled={loading}
          />
        </div>

        {openedModal === ACTION.EDIT && (
          <Modal
            title="Editing the Faculty"
            onClose={this.closeModal}
            icon={pencilIcon}
          >
            <EditCard
              label="Faculty"
              inputValue={activeDepartment.name}
              onSave={this.confirmEdit}
            />
          </Modal>
        )}

        {openedModal === ACTION.DELETE && (
          <Modal
            title="Deleting the Faculty"
            onClose={this.closeModal}
            icon={deleteIcon}
          >
            <DeleteCard
              text="Are you sure? The faculty will be deleted!"
              onDelete={this.confirmDelete}
              onClose={this.closeModal}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default FacultyBlock;

// FacultyBlock.propTypes = {
//   department: PropTypes.array.isRequired,
// };
